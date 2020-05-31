import React, { useState } from 'react'
import { TaskListQuery } from '../../../graphql/generates'
import {
  Heading,
  Box,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverBody,
  Flex,
  PopoverHeader,
} from '@chakra-ui/core'
import { Draggable } from 'react-beautiful-dnd'
import { TaskComments } from '../TaskComments'
import { EditTaskModal } from '../EditTaskModal'
import { DotsMenu } from '../../../components/DotsMenu/Index'
import styled from '@emotion/styled'
import { IconButtonWithTooltip } from '../../../components/IconButtonWithTooltip'

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
          borderRadius={6}
          bg="#f2f2fe"
          boxShadow={
            showComments
              ? '0 0 0px 2px #9772ff'
              : '0px 2px 4px 0 rgb(216,216,216)'
          }
        >
          <Popover placement="right-start">
            <PopoverTrigger>
              <Box p={2} fontSize="0.875rem">
                <Flex position="relative" mb={4}>
                  <Text pr={10} fontWeight={500}>
                    Opened by {task.author.username}
                  </Text>
                  <DotsMenu
                    ariaLabel="Open Task Options"
                    position="absolute"
                    right={0}
                    top={-3}
                  >
                    <StyledOptionMenu>
                      <IconButtonWithTooltip
                        ariaLabel="Edit Task"
                        onClick={() => setIsEditTaskModalOpen(true)}
                        icon="edit"
                      />
                      <IconButtonWithTooltip
                        ariaLabel="Delete Task"
                        onClick={() => deleteTask()}
                        icon="delete"
                      />
                    </StyledOptionMenu>
                  </DotsMenu>
                </Flex>
                {task.assignee && (
                  <Heading mt={2} size="sm" fontWeight={500}>
                    Assigned to {task.assignee?.username}
                  </Heading>
                )}
                <Text mb={2}>{task.description}</Text>
                {isEditTaskModalOpen && (
                  <EditTaskModal
                    task={task}
                    closeModal={() => setIsEditTaskModalOpen(false)}
                  />
                )}
                <CommentsButton
                  aria-label="Open Comments"
                  onClick={() => toggleComments()}
                >
                  {task.commentsCount} Comments
                </CommentsButton>
              </Box>
            </PopoverTrigger>
            <PopoverContent zIndex={4}>
              <PopoverHeader p={3}>
                <Heading as="h3" size="sm">
                  Comments
                </Heading>
                <PopoverCloseButton
                  top="0.5rem"
                  onClick={() => toggleComments()}
                />
              </PopoverHeader>
              <PopoverBody p={0}>
                <TaskComments taskId={task.id} />
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
      )}
    </Draggable>
  )
}

const StyledOptionMenu = styled(Box)`
  > :not(:first-of-type) {
    margin-left: 0.5rem;
  }
`

const CommentsButton = styled.button`
  font-weight: 600;
  color: #7b21e8;
  &:hover,
  &:focus {
    text-decoration: underline;
  }
`
