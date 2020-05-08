import React, { useState } from 'react'
import { TaskListQuery } from '../../../graphql/generates'
import {
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
import { Draggable } from 'react-beautiful-dnd'
import { TaskComments } from '../TaskComments/TaskComments'
import { EditTaskModal } from '../../../components/EditTaskModal/EditTaskModal'

type TaskListResult = NonNullable<TaskListQuery['taskList']>

export const Task = ({
  task,
  index,
  deleteTask,
  showComments,
  toggleComments,
}: {
  task: TaskListResult[0]['tasks'][0]
  index: number
  deleteTask: () => void
  showComments: boolean
  toggleComments: () => void
}) => {
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false)

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
                  {task.assignee && (
                    <Heading size="sm">
                      Assigned to {task.assignee?.username} by{' '}
                      {task.assignedBy?.username}
                    </Heading>
                  )}
                  <Text>{task.description}</Text>
                  <IconButton
                    ml={2}
                    aria-label="edit task"
                    size="sm"
                    icon="edit"
                    onClick={() => setIsEditTaskModalOpen(true)}
                  />
                  {isEditTaskModalOpen && (
                    <EditTaskModal
                      task={task}
                      closeModal={() => setIsEditTaskModalOpen(false)}
                    />
                  )}
                  <Text as="span">{task.commentsCount} comments</Text>
                </Box>
              </Box>
            </PopoverTrigger>
          </Popover>
        </Box>
      )}
    </Draggable>
  )
}
