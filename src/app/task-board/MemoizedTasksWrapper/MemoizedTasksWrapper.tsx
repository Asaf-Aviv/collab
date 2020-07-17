import React, { memo, Dispatch, SetStateAction } from 'react'
import {
  TaskListQuery,
  useDeleteTaskMutation,
} from '../../../graphql/generates'
import { Task } from '../Task'

type TaskListResult = NonNullable<TaskListQuery['taskList']>
type Props = {
  tasks: TaskListResult['taskList'][number]['tasks']
  setSelectedTaskId: Dispatch<SetStateAction<string | null>>
  deleteTask: ReturnType<typeof useDeleteTaskMutation>[0]
  selectedTaskId: string | null
  isDraggable: boolean
}

export const MemoizedTasksWrapper = memo(
  ({
    tasks,
    deleteTask,
    setSelectedTaskId,
    selectedTaskId,
    isDraggable,
  }: Props) => (
    <>
      {tasks.map((task, index) => (
        <Task
          isDraggable={isDraggable}
          key={task.id}
          task={task}
          index={index}
          showComments={selectedTaskId === task.id}
          toggleComments={() =>
            setSelectedTaskId(prevState =>
              prevState === task.id ? null : task.id,
            )
          }
          deleteTask={() => deleteTask({ variables: { taskId: task.id } })}
        />
      ))}
    </>
  ),
)

MemoizedTasksWrapper.displayName = 'MemoizedTasksWrapper'
