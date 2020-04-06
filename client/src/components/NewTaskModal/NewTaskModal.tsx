import React, { useState, useRef } from 'react'
import {
  useCreateTaskMutation,
  TaskListQueryResult,
  TaskListDocument,
  useCollabMembersQuery,
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
  FormControl,
  Flex,
  Avatar,
  Text,
  Textarea,
} from '@chakra-ui/core'
import Select from 'react-select'

type Props = {
  closeModal: () => void
  taskListId: string
}

export const NewTaskModal = ({ closeModal, taskListId }: Props) => {
  const { collabId } = useParams<{ collabId: string }>()
  const [description, setDescription] = useState('')
  const [assigneeId, setAssigneeId] = useState<string | null>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null!)
  const { data: membersData } = useCollabMembersQuery({
    variables: { collabId },
  })!
  const [createTask, { loading, error }] = useCreateTaskMutation({
    variables: {
      input: {
        collabId,
        taskListId,
        description,
        assigneeId,
      },
    },
    update(store, { data }) {
      const taskListData = store.readQuery<TaskListQueryResult['data']>({
        query: TaskListDocument,
        variables: { collabId },
      })!

      const updatedTaskList = taskListData.taskList!.map(taskList => {
        if (taskList.id === taskListId) {
          return {
            ...taskList,
            tasks: [...taskList.tasks, data!.createTask],
          }
        }
        return taskList
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

  const handleCreateTask = () => {
    if (!description || loading) return
    createTask()
  }

  return (
    <Modal
      initialFocusRef={textAreaRef}
      preserveScrollBarGap
      isOpen
      onClose={() => closeModal()}
    >
      <ModalOverlay />
      <ModalContent borderRadius={6}>
        <ModalHeader>Add a new task</ModalHeader>
        <ModalCloseButton size="lg" />
        <ModalBody>
          <FormControl mt={4}>
            <FormLabel>Task description</FormLabel>
            <Textarea
              ref={textAreaRef}
              onChange={(e: any) => setDescription(e.target.value)}
              value={description}
              p={2}
              resize="none"
              lineHeight={1.2}
              minHeight={120}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Assignee</FormLabel>
            <Select
              options={membersData?.collab?.members.map(member => ({
                value: member.id,
                label: member.username,
                avatar: member.avatar,
              }))}
              placeholder="Assign to"
              isClearable
              onChange={(option: any) => setAssigneeId(option?.value ?? null)}
              components={{ Option: CustomOption }}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={() => closeModal()}>
            Close
          </Button>
          <Button variantColor="purple" onClick={() => handleCreateTask()}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const CustomOption = (props: any) => {
  console.log(props)
  return (
    <Flex cursor="pointer" {...props.innerProps} align="center" px={2} py={1}>
      <Avatar
        mr={2}
        size="sm"
        src={props.data.avatar}
        name={props.data.label}
      />
      <Text as="span" color="black">
        {props.data.label}
      </Text>
    </Flex>
  )
}
