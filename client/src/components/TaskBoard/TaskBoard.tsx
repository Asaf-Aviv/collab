import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  useTaskListQuery,
  useUpdateTaskPositionMutation,
  useUpdateTaskListPositionMutation,
  useMoveTaskToListMutation,
} from '../../graphql/generates'
import { Flex, IconButton } from '@chakra-ui/core'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { NewTaskListModal } from '../NewTaskListModal/NewTaskListModal'
import { MemoizedTaskListWrapper } from '../TaskList/TaskList'

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

  console.log(isCreateTaskListModalOpen)

  return (
    <Flex>
      {isCreateTaskListModalOpen && (
        <NewTaskListModal
          closeModal={() => setIsCreateTaskListModalOpen(false)}
        />
      )}
      <IconButton
        aria-label="create task list"
        onClick={() => setIsCreateTaskListModalOpen(true)}
        icon="add"
      ></IconButton>
      <DragDropContext
        onDragStart={console.log}
        onDragUpdate={console.log}
        onDragEnd={handleDragEnd}
      >
        <Droppable
          droppableId="list-columns"
          direction="horizontal"
          type="column"
        >
          {provided => (
            <Flex {...provided.droppableProps} ref={provided.innerRef} flex={1}>
              <MemoizedTaskListWrapper taskList={taskList} refetch={refetch} />
              {provided.placeholder}
            </Flex>
          )}
        </Droppable>
      </DragDropContext>
    </Flex>
  )
}
