import React, { useState, useRef } from 'react'
import {
  useCollabMembersQuery,
  useUpdateTaskMutation,
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
import { TaskListQuery } from '../../graphql/generates'

type TaskListResult = NonNullable<TaskListQuery['taskList']>

type Props = {
  closeModal: () => void
  task: TaskListResult[0]['tasks'][0]
}

export const EditTaskModal = ({ closeModal, task }: Props) => {
  const { collabId } = useParams<{ collabId: string }>()
  const [description, setDescription] = useState(task.description)
  const [assigneeId, setAssigneeId] = useState(task.assignee?.id ?? null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null!)
  const { data: membersData } = useCollabMembersQuery({
    variables: { collabId },
  })!
  const [updateTask, { loading /* error */ }] = useUpdateTaskMutation({
    variables: {
      input: {
        taskId: task.id,
        description,
        assigneeId,
      },
    },
    onCompleted: () => closeModal(),
  })

  const handleUpdateTask = () => {
    if (
      loading ||
      !description ||
      (description === task.description && assigneeId === task.assignedBy)
    ) {
      return
    }

    updateTask()
  }

  const membersOptionsById = membersData!.collab!.members.reduce(
    (res, member) => ({
      ...res,
      [member.id]: {
        value: member.id,
        label: member.username,
        avatar: member.avatar,
      },
    }),
    {} as Record<string, any>,
  )

  return (
    <Modal
      initialFocusRef={textAreaRef}
      preserveScrollBarGap
      isOpen
      onClose={() => closeModal()}
    >
      <ModalOverlay />
      <ModalContent borderRadius={6}>
        <ModalHeader>Update task</ModalHeader>
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
              options={Object.values(membersOptionsById)}
              value={assigneeId ? membersOptionsById[assigneeId] : null}
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
          <Button variantColor="purple" onClick={() => handleUpdateTask()}>
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const CustomOption = (props: any) => {
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
