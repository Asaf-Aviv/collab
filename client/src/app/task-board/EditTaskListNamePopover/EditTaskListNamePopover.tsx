import React, { useState, useRef } from 'react'
import FocusLock from 'react-focus-lock'
import {
  ButtonGroup,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  Popover,
  Button,
  Input,
  FormLabel,
} from '@chakra-ui/core'
import { IconButtonWithTooltip } from '../../../components/IconButtonWithTooltip'
import { useUpdateTaskListNameMutation } from '../../../graphql/generates'

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
        <IconButtonWithTooltip ariaLabel="Edit Tasklist Name" icon="edit" />
      </PopoverTrigger>
      <PopoverContent
        zIndex={4}
        p={5}
        boxShadow="lg"
        style={{ margin: 0, width: 300 }}
        position="absolute"
        left={-65}
        onKeyDown={(e: any) => e.stopPropagation()}
      >
        <FocusLock>
          <PopoverCloseButton size="md" />
          <form
            onSubmit={e => {
              e.preventDefault()
              handleUpdateName()
            }}
          >
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
              <Button type="submit" variantColor="purple">
                Update
              </Button>
            </ButtonGroup>
          </form>
        </FocusLock>
      </PopoverContent>
    </Popover>
  )
}
