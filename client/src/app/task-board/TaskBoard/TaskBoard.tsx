import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  useTaskListQuery,
  useUpdateTaskPositionMutation,
  useUpdateTaskListPositionMutation,
  useMoveTaskToListMutation,
  useCollabQuery,
} from '../../../graphql/generates'
import { Flex } from '@chakra-ui/core'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { NewTaskListModal } from '../NewTaskListModal'
import { MemoizedTaskListWrapper } from '../TaskList'
import { IconButtonWithTooltip } from '../../../components/IconButtonWithTooltip'

export const TaskBoard = () => {
  const { collabId } = useParams<{ collabId: string }>()
  const { data, refetch } = useTaskListQuery({ variables: { collabId } })
  const [isCreateTaskListModalOpen, setIsCreateTaskListModalOpen] = useState(
    false,
  )
  const [updateTaskPosition] = useUpdateTaskPositionMutation({
    onCompleted: () => refetch(),
  })
  const [updateTaskListPosition] = useUpdateTaskListPositionMutation({
    onCompleted: () => refetch(),
  })
  const [moveTaskToList] = useMoveTaskToListMutation({
    onCompleted: () => refetch(),
  })
  const { data: collabData } = useCollabQuery({ variables: { collabId } })

  if (!data?.taskList) return null

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
      updateTaskListPosition({
        variables: {
          input: {
            collabId,
            oldTaskListPosition: source.index,
            newTaskListPosition: destination.index,
          },
        },
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

  const { taskList } = data

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
              flex={1}
              overflowX="auto"
              overflowY="hidden"
              maxWidth="calc(100vw - 250px - 5%)"
              height="calc(100vh - 64px - 4rem)"
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
            </Flex>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}
