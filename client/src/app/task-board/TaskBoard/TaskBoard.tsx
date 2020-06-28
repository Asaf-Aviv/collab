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
    onError: () => refetch(),
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
        const modifiedTaskList = draft.taskList.taskList.find(
          ({ order }) => order === oldTaskListPosition,
        )

        draft.taskList.taskList.forEach(tasklist => {
          if (oldTaskListPosition < newTaskListPosition) {
            if (
              tasklist.order <= newTaskListPosition &&
              tasklist.order > oldTaskListPosition
            ) {
              tasklist.order -= 1
            }
          } else {
            if (
              tasklist.order >= newTaskListPosition &&
              tasklist.order < oldTaskListPosition
            ) {
              tasklist.order += 1
            }
          }
        })

        modifiedTaskList!.order = newTaskListPosition
        draft.taskList.taskList.sort((a, b) => a.order - b.order)
      })

      client.writeQuery({
        query: TaskListDocument,
        variables: { collabId },
        data: updatedTaskList,
      })

      return
    }

    // if a task has been reordered in the same tasklist
    if (destination.droppableId === source.droppableId) {
      const tasklistId = destination.droppableId
      const oldTaskPosition = source.index
      const newTaskPosition = destination.index

      updateTaskPosition({
        variables: {
          input: {
            oldTaskPosition,
            newTaskPosition,
            taskListId: source.droppableId,
          },
        },
      })

      const taskListData = client.readQuery<TaskListQuery>({
        query: TaskListDocument,
        variables: { collabId },
      })!

      const updatedTaskList = produce(taskListData, draft => {
        const tasklist = draft.taskList.taskList.find(
          ({ id }) => id === tasklistId,
        )

        const modifiedTask = tasklist?.tasks.find(
          ({ order }) => order === oldTaskPosition,
        )

        tasklist!.tasks.forEach(task => {
          if (oldTaskPosition < newTaskPosition) {
            if (task.order <= newTaskPosition && task.order > oldTaskPosition) {
              task.order -= 1
            }
          } else {
            if (task.order >= newTaskPosition && task.order < oldTaskPosition) {
              task.order += 1
            }
          }
        })

        modifiedTask!.order = newTaskPosition
        tasklist!.tasks.sort((a, b) => a.order - b.order)
      })

      client.writeQuery({
        query: TaskListDocument,
        variables: { collabId },
        data: updatedTaskList,
      })

      return
    }

    // task has been moved to another task list
    const oldTaskListId = source.droppableId
    const newTaskListId = destination.droppableId
    const oldTaskPosition = source.index
    const newTaskPosition = destination.index

    moveTaskToList({
      variables: {
        input: {
          oldTaskListId,
          newTaskListId,
          oldTaskPosition,
          newTaskPosition,
        },
      },
    })

    const taskListData = client.readQuery<TaskListQuery>({
      query: TaskListDocument,
      variables: { collabId },
    })!

    const updatedTaskList = produce(taskListData, draft => {
      const oldTasklist = draft.taskList.taskList.find(
        ({ id }) => id === oldTaskListId,
      )
      const task = oldTasklist!.tasks.splice(oldTaskPosition, 1)[0]

      oldTasklist!.tasks.forEach((task, i) => {
        task.order = i
      })

      const newTasklist = draft.taskList.taskList.find(
        ({ id }) => id === newTaskListId,
      )
      newTasklist!.tasks.splice(newTaskPosition, 0, task)

      newTasklist!.tasks.forEach((task, i) => {
        task.order = i
      })
    })

    client.writeQuery({
      query: TaskListDocument,
      variables: { collabId },
      data: updatedTaskList,
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
                    left="247px"
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
