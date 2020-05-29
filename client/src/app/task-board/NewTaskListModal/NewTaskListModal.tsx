import React, { useState, useRef } from 'react'
import {
  useCreateTaskListMutation,
  TaskListDocument,
  TaskListQueryResult,
} from '../../../graphql/generates'
import { useParams } from 'react-router-dom'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Button,
  FormLabel,
  Input,
  FormControl,
  Box,
  Flex,
} from '@chakra-ui/core'

type Props = {
  closeModal: () => void
}

export const NewTaskListModal = ({ closeModal }: Props) => {
  const { collabId } = useParams<{ collabId: string }>()
  const [taskListName, setTaskListName] = useState('')
  const inputRef = useRef<HTMLInputElement>(null!)
  const [createTaskList, { loading /* error */ }] = useCreateTaskListMutation({
    variables: {
      input: {
        collabId,
        name: taskListName,
      },
    },
    update(store, { data }) {
      const taskListData = store.readQuery<TaskListQueryResult['data']>({
        query: TaskListDocument,
        variables: { collabId },
      })!

      const updatedTaskList = taskListData.taskList!.concat({
        ...data!.createTaskList,
        tasks: [],
      })

      store.writeQuery({
        query: TaskListDocument,
        variables: { collabId },
        data: {
          taskList: updatedTaskList,
        },
      })

      closeModal()
    },
  })

  const handleCreateTaskList = () => {
    if (!taskListName || loading) return
    createTaskList()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <Modal
      initialFocusRef={inputRef}
      preserveScrollBarGap
      isOpen
      onClose={() => closeModal()}
    >
      <ModalOverlay />
      <ModalContent borderRadius={6}>
        <ModalHeader>Add a new task list</ModalHeader>
        <ModalCloseButton size="lg" />
        <ModalBody pb={6}>
          <Box as="form" onSubmit={handleSubmit} display="block">
            <FormControl my={4}>
              <FormLabel>Tasklist name</FormLabel>
              <Input
                ref={inputRef}
                onChange={(e: any) => setTaskListName(e.target.value)}
                value={taskListName}
                placeholder="Tasklist name"
              />
            </FormControl>
            <Flex justify="flex-end">
              <Button variant="ghost" mr={3} onClick={() => closeModal()}>
                Close
              </Button>
              <Button
                type="submit"
                variantColor="purple"
                onClick={() => handleCreateTaskList()}
              >
                Create
              </Button>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
