import React, { useState, useRef } from 'react'
import FocusLock from 'react-focus-lock'
import { useUpdateTaskListNameMutation } from '../../../graphql/generates'
import {
  IconButton,
  ButtonGroup,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  Popover,
  Button,
  Input,
  FormLabel,
} from '@chakra-ui/core'

type Props = {
  taskListId: string
  taskListName: string
}

export const EditTaskListNamePopover = ({
  taskListId,
  taskListName,
}: Props) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [newName, setNewName] = useState(taskListName)
  const firstFieldRef = useRef(null)
  const [
    updateTaskListName,
    { loading /* error */ },
  ] = useUpdateTaskListNameMutation({
    onCompleted: () => close(),
  })

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  const handleUpdateName = () => {
    if (loading) return
    if (!newName || newName === taskListName) return

    updateTaskListName({
      variables: {
        input: {
          taskListId,
          name: newName,
        },
      },
    })
  }

  return (
    <Popover
      isOpen={isOpen}
      initialFocusRef={firstFieldRef}
      onOpen={open}
      onClose={close}
      placement="bottom"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <IconButton
          ml={2}
          aria-label="edit task list name"
          size="sm"
          icon="edit"
        />
      </PopoverTrigger>
      <PopoverContent zIndex={4} p={5} boxShadow="lg">
        <FocusLock>
          <PopoverArrow bg="white" />
          <PopoverCloseButton size="md" />
          <FormLabel mb={2}>Update tasklist name</FormLabel>
          <Input
            p={1}
            mb={4}
            ref={firstFieldRef}
            onChange={(e: any) => setNewName(e.target.value)}
            value={newName}
            placeholder="New tasklist name"
          />
          <ButtonGroup ml="auto" justifyContent="center" size="sm">
            <Button onClick={close}>Cancel</Button>
            <Button variantColor="purple" onClick={handleUpdateName}>
              Update
            </Button>
          </ButtonGroup>
        </FocusLock>
      </PopoverContent>
    </Popover>
  )
}
