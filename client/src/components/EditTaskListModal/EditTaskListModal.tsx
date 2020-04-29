import React, { useState, useRef } from 'react'
import {
  useCreateTaskListMutation,
  TaskListDocument,
  TaskListQuery,
} from '../../graphql/generates'
import { useParams } from 'react-router-dom'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  Button,
  FormLabel,
  Input,
  FormControl,
} from '@chakra-ui/core'

type Props = {
  task: NonNullable<NonNullable<TaskListQuery>['taskList']>[0]
  closeModal: () => void
}

export const NewTaskListModal = ({ closeModal, task }: Props) => {
  const { collabId } = useParams<{ collabId: string }>()
  const [taskListName, setTaskListName] = useState(task.name)
  const inputRef = useRef<HTMLInputElement>(null!)
  const [createTaskList, { loading, error }] = useCreateTaskListMutation({
    variables: {
      input: {
        collabId,
        name: taskListName,
      },
    },
    update(store, { data }) {
      const taskListData = store.readQuery<TaskListQuery>({
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
        <ModalBody>
          <FormControl mt={4}>
            <FormLabel>Tasklist name</FormLabel>
            <Input
              ref={inputRef}
              onChange={(e: any) => setTaskListName(e.target.value)}
              value={taskListName}
              placeholder="Tasklist name"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={() => closeModal()}>
            Close
          </Button>
          <Button variantColor="purple" onClick={() => handleCreateTaskList()}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
