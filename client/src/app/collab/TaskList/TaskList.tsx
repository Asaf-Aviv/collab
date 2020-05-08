import React, { useState, memo } from 'react'
// import { useParams } from 'react-router-dom'
import {
  TaskListQuery,
  useDeleteTaskListMutation,
  useDeleteTaskMutation,
} from '../../../graphql/generates'
import { Heading, Box, IconButton, Flex } from '@chakra-ui/core'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { NewTaskModal } from '../../../components/NewTaskModal/NewTaskModal'
import { Task } from '../Task/Task'
import { EditTaskListNamePopover } from '../../../components/EditTaskListNamePopover/EditTaskListNamePopover'

export const MemoizedTaskListWrapper = memo(({ taskList, refetch }: any) => (
  <>
    {(taskList as any[]).map(({ tasks, ...list }: any, index) => (
      <Column
        key={list.id}
        taskList={list}
        tasks={tasks}
        refetch={refetch}
        index={index}
      />
    ))}
  </>
))

MemoizedTaskListWrapper.displayName = 'MemoizedTaskListWrapper'

type TaskListResult = NonNullable<TaskListQuery['taskList']>
type ColumnProps = {
  taskList: Omit<TaskListResult[number], 'tasks'>
  tasks: TaskListResult[number]['tasks']
  refetch: any
  index: number
}

const Column = ({ taskList, tasks, refetch, index }: ColumnProps) => {
  // const { collabId } = useParams<{ collabId: string }>()
  // const { data: membersData } = useCollabMembersQuery({
  //   variables: {
  //     collabId,
  //   },
  // })
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false)
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  // const [createTask] = useCreateTaskMutation({
  //   onCompleted: () => refetch(),
  // })
  const [deleteTaskList] = useDeleteTaskListMutation({
    variables: {
      taskListId: taskList.id,
    },
    onCompleted: () => refetch(),
  })
  const [deleteTask] = useDeleteTaskMutation({
    onCompleted: () => refetch(),
  })
  // const [updateTaskAssignee] = useUpdateTaskAssigneeMutation({
  //   onCompleted: () => refetch(),
  // })

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
          {isNewTaskModalOpen && (
            <NewTaskModal
              closeModal={() => setIsNewTaskModalOpen(false)}
              taskListId={taskList.id}
            />
          )}
          <IconButton
            aria-label="create new task"
            onClick={() => setIsNewTaskModalOpen(true)}
            icon="add"
          >
            ADD
          </IconButton>
          <Flex justify="space-between">
            <Heading {...provided.dragHandleProps} size="sm" mb={2} p={2}>
              {taskList.name}
            </Heading>
            <EditTaskListNamePopover
              taskListId={taskList.id}
              taskListName={taskList.name}
            />
          </Flex>
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
