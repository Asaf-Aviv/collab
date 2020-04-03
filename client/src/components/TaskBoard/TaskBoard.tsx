import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  useTaskListQuery,
  useTaskCommentsQuery,
  TaskListQuery,
  useDeleteTaskListMutation,
  useCreateTaskListMutation,
  useUpdateTaskPositionMutation,
  useUpdateTaskListPositionMutation,
  useMoveTaskToListMutation,
  useCreateTaskMutation,
  useDeleteTaskMutation,
} from '../../graphql/generates'
import {
  Flex,
  Heading,
  Box,
  Text,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverBody,
} from '@chakra-ui/core'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd'

export const TaskBoard = () => {
  const { collabId } = useParams<{ collabId: string }>()
  const { data, refetch } = useTaskListQuery({ variables: { collabId } })
  const [updateTaskPosition] = useUpdateTaskPositionMutation({
    onCompleted: () => refetch(),
  })
  const [createTaskList] = useCreateTaskListMutation({
    variables: {
      input: {
        collabId,
        name: 'new list',
      },
    },
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

  return (
    <Flex>
      <IconButton
        aria-label="create task list"
        onClick={() => createTaskList()}
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
              {taskList.map(({ tasks, ...list }, index) => (
                <Column
                  key={list.id}
                  taskList={list}
                  tasks={tasks}
                  refetch={refetch}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </Flex>
          )}
        </Droppable>
      </DragDropContext>
    </Flex>
  )
}

type TaskListResult = NonNullable<TaskListQuery['taskList']>
type ColumnProps = {
  taskList: Omit<TaskListResult[number], 'tasks'>
  tasks: TaskListResult[number]['tasks']
  refetch: any
  index: number
}

const Column = ({ taskList, tasks, refetch, index }: ColumnProps) => {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const { collabId } = useParams<{ collabId: string }>()
  const [createTask] = useCreateTaskMutation({
    onCompleted: () => refetch(),
  })
  const [deleteTaskList] = useDeleteTaskListMutation({
    variables: {
      taskListId: taskList.id,
    },
    onCompleted: () => refetch(),
  })
  const [deleteTask] = useDeleteTaskMutation({
    onCompleted: () => refetch(),
  })

  return (
    <Draggable draggableId={taskList.id} index={index}>
      {provided => (
        <Box
          {...provided.draggableProps}
          ref={provided.innerRef}
          mr={2}
          borderRadius={3}
          border="1px solid"
          padding={2}
          flex={1}
          bg="white"
          maxWidth={300}
          minHeight={200}
        >
          <IconButton
            aria-label="delete task list"
            onClick={() => deleteTaskList()}
            icon="delete"
          >
            Delete
          </IconButton>
          <IconButton
            aria-label="delete task list"
            onClick={() =>
              createTask({
                variables: {
                  input: {
                    collabId,
                    taskListId: taskList.id,
                    description: 'new task',
                    assigneeId: null,
                  },
                },
              })
            }
            icon="add"
          >
            ADD
          </IconButton>
          <Heading
            {...provided.dragHandleProps}
            size="sm"
            mb={2}
            p={2}
            textAlign="center"
          >
            {taskList.name}
          </Heading>
          <Droppable droppableId={taskList.id} type="task">
            {provided => (
              <Box
                height="100%"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks.map((task, index) => (
                  <Task
                    showComments={selectedTaskId === task.id}
                    toggleComments={() =>
                      setSelectedTaskId(prevState =>
                        prevState === task.id ? null : task.id,
                      )
                    }
                    key={task.id}
                    task={task}
                    index={index}
                    deleteTask={() =>
                      deleteTask({ variables: { taskId: task.id } })
                    }
                  />
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </Box>
      )}
    </Draggable>
  )
}

const Task = ({
  task,
  index,
  deleteTask,
  showComments,
  toggleComments,
}: {
  task: TaskListResult[number]['tasks'][number]
  index: number
  deleteTask: () => void
  showComments: boolean
  toggleComments: () => void
}) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {provided => (
        <Box
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          mb={2}
          borderRadius={3}
          border="1px solid"
          p={2}
          bg="white"
        >
          <Popover placement="right-start" isOpen={showComments}>
            <PopoverTrigger>
              <Box>
                <Box onClick={e => e.stopPropagation()}>
                  <IconButton
                    aria-label="show or hide comments"
                    size="sm"
                    icon="chat"
                    variantColor="purple"
                    onClick={() => toggleComments()}
                  />
                </Box>
                <Box>
                  <PopoverContent zIndex={4}>
                    <PopoverCloseButton onClick={() => toggleComments()} />
                    {showComments && (
                      <PopoverBody>
                        <TaskComments taskId={task.id} />
                      </PopoverBody>
                    )}
                  </PopoverContent>
                  <IconButton
                    aria-label="delete task list"
                    onClick={() => deleteTask()}
                    icon="delete"
                  >
                    Delete
                  </IconButton>
                  <Text>{task.description}</Text>
                </Box>
              </Box>
            </PopoverTrigger>
          </Popover>
        </Box>
      )}
    </Draggable>
  )
}

const TaskComments = ({ taskId }: { taskId: string }) => {
  const { data, loading, error } = useTaskCommentsQuery({
    variables: { taskId },
  })

  if (loading) return <h1>loading</h1>
  if (error) return <h1>Collab not found</h1>
  if (!data?.task?.comments) return null

  const { comments } = data.task

  return (
    <div>
      {comments.map(comment => (
        <Box key={comment.id}>{comment.content}</Box>
      ))}
    </div>
  )
}
