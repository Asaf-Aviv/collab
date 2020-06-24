import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  useTaskListQuery,
  useUpdateTaskPositionMutation,
  useUpdateTaskListPositionMutation,
  useMoveTaskToListMutation,
  useCollabQuery,
  TaskListQuery,
  TaskListDocument,
} from '../../../graphql/generates'
import produce from 'immer'
import { Flex } from '@chakra-ui/core'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { NewTaskListModal } from '../NewTaskListModal'
import { MemoizedTaskListWrapper } from '../TaskList'
import { IconButtonWithTooltip } from '../../../components/IconButtonWithTooltip'
import { Loader } from '../../../components/Loader'
import { DisplayError } from '../../../components/DisplayError'
import { useApolloClient } from '@apollo/react-hooks'

export const TaskBoard = () => {
  const { collabId } = useParams<{ collabId: string }>()
  const client = useApolloClient()
  const { data, loading, error, refetch } = useTaskListQuery({
    variables: { collabId },
  })
  const [isCreateTaskListModalOpen, setIsCreateTaskListModalOpen] = useState(
    false,
  )
  const [updateTaskPosition] = useUpdateTaskPositionMutation({
    onCompleted: () => refetch(),
  })
  const [updateTaskListPosition] = useUpdateTaskListPositionMutation({
    onError: () => refetch(),
  })
  const [moveTaskToList] = useMoveTaskToListMutation({
    onCompleted: () => refetch(),
  })
  const { data: collabData } = useCollabQuery({ variables: { collabId } })

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, type /* draggableId */ } = result

    if (!destination) {
      return
    }

    // if the user dropped the item in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    // if a task list has been reordered
    if (type === 'column') {
      const oldTaskListPosition = source.index
      const newTaskListPosition = destination.index

      updateTaskListPosition({
        variables: {
          input: {
            collabId,
            oldTaskListPosition,
            newTaskListPosition,
          },
        },
      })

      const taskListData = client.readQuery<TaskListQuery>({
        query: TaskListDocument,
        variables: { collabId },
      })!

      const updatedTaskList = produce(taskListData, draft => {
        const oldTaskList = draft.taskList.taskList[oldTaskListPosition]
        const destTaskList = draft.taskList.taskList[newTaskListPosition]

        oldTaskList.order = newTaskListPosition
        destTaskList.order = oldTaskListPosition

        draft.taskList.taskList[oldTaskListPosition] = destTaskList
        draft.taskList.taskList[newTaskListPosition] = oldTaskList
      })

      client.writeQuery({
        query: TaskListDocument,
        variables: { collabId },
        data: updatedTaskList,
      })

      return
    }

    // if a task has been reordered in the same task list
    if (destination.droppableId === source.droppableId) {
      updateTaskPosition({
        variables: {
          input: {
            oldTaskPosition: source.index,
            newTaskPosition: destination.index,
            taskListId: source.droppableId,
          },
        },
      })
      return
    }

    // task has been moved to another task list
    moveTaskToList({
      variables: {
        input: {
          oldTaskListId: source.droppableId,
          newTaskListId: destination.droppableId,
          oldTaskPosition: source.index,
          newTaskPosition: destination.index,
        },
      },
    })
  }

  const taskList = data?.taskList?.taskList || []

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable
          droppableId="list-columns"
          direction="horizontal"
          type="column"
        >
          {provided => (
            <Flex
              {...provided.droppableProps}
              ref={provided.innerRef}
              padding={2}
              borderRadius={6}
              flex={1}
              overflowX="auto"
              overflowY="hidden"
              height="calc(100vh - 64px - 2rem)"
              bg="#f2f2ff"
            >
              {collabData?.collab?.isOwner && (
                <>
                  <IconButtonWithTooltip
                    ariaLabel="Create Tasklist"
                    icon="add"
                    onClick={() => setIsCreateTaskListModalOpen(true)}
                    position="absolute"
                    left={15}
                  />
                  {isCreateTaskListModalOpen && (
                    <NewTaskListModal
                      closeModal={() => setIsCreateTaskListModalOpen(false)}
                    />
                  )}
                </>
              )}
              <MemoizedTaskListWrapper taskList={taskList} refetch={refetch} />
              {provided.placeholder}
              {loading && <Loader />}
              {error && (
                <DisplayError
                  onClick={() => refetch()}
                  message="Could not fetch task board"
                />
              )}
            </Flex>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}
