import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { debounce } from 'lodash-es'
import {
  useCollabMembersQuery,
  useRemoveMemberMutation,
  useSearchUsersLazyQuery,
  useInviteMemberMutation,
} from '../../../graphql/generates'
import { UserCard } from '../../../components/UserCard/UserCard'
import {
  Grid,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Box,
  Flex,
} from '@chakra-ui/core'
import { useCurrentUser } from '../../../providers'
import { DotsMenu } from '../../../components/DotsMenu/Index'
import { Loader } from '../../../components/Loader'
import { DisplayError } from '../../../components/DisplayError'
import { AvatarWithUsername } from '../../../components/AvatarWithUsername'
import { useToastNotification } from '../../notifications'

type Props = {
  closeModal: () => void
}

const InviteMembersModal = ({ closeModal }: Props) => {
  const { collabId } = useParams<{ collabId: string }>()
  const [searchInput, setSearchInput] = useState('')
  const [searchUsers, { data, loading, error }] = useSearchUsersLazyQuery({
    notifyOnNetworkStatusChange: true,
  })
  const notify = useToastNotification()
  const [inviteMember] = useInviteMemberMutation({
    onCompleted() {
      notify('success', {
        title: 'Success',
        message: 'Invitation sent successfully!',
      })
    },
    onError({ message }) {
      notify('error', {
        title: 'Error',
        message,
      })
    },
  })

  const handleSearchMembers = useCallback(
    debounce((username: string) => {
      searchUsers({
        variables: {
          input: {
            username,
          },
        },
      })
    }, 200),
    [],
  )

  useEffect(() => {
    if (!searchInput) return

    handleSearchMembers(searchInput)
  }, [handleSearchMembers, searchInput])

  return (
    <Modal size="sm" preserveScrollBarGap isOpen onClose={() => closeModal()}>
      <ModalOverlay />
      <ModalContent borderRadius={6} minHeight="30%" maxHeight="70%">
        <ModalHeader>Invite Members</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel htmlFor="search-users" hidden>
              Search Users
            </FormLabel>
            <Input
              id="search-users"
              placeholder="Search as you type"
              bg="#f2f2ff"
              value={searchInput}
              autoFocus
              onChange={(e: any) => setSearchInput(e.target.value)}
              borderColor="transparent"
              _hover={{ borderColor: '#cab3ff' }}
              _focus={{ borderColor: '#805ad5' }}
              borderWidth={2}
            />
          </FormControl>
          {data?.searchUsers.map(user => (
            <Flex id={user.id} py={2} justify="space-between" align="center">
              <AvatarWithUsername size="sm" {...user} />
              <Button
                variantColor="purple"
                size="sm"
                onClick={() => {
                  inviteMember({
                    variables: {
                      collabId,
                      memberId: user.id,
                    },
                  })
                }}
              >
                Invite
              </Button>
            </Flex>
          ))}
          {loading && <Loader />}
          {error && <DisplayError message="Could not fetch members" />}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export const CollabMembers = ({ isOwner = false }) => {
  const { collabId } = useParams<{ collabId: string }>()
  const [isInviteMembersModalOpen, setIsInviteMembersModalOpen] = useState(
    false,
  )
  const currentUser = useCurrentUser()
  const { data } = useCollabMembersQuery({ variables: { collabId } })
  const [removeMember] = useRemoveMemberMutation()

  return (
    <Box as="main" pb={4}>
      {isOwner && (
        <Button
          variantColor="purple"
          onClick={() => setIsInviteMembersModalOpen(true)}
          mx={['auto', 'auto', 'initial']}
          display="block"
          mb={2}
        >
          Invite Members
        </Button>
      )}
      {isInviteMembersModalOpen && (
        <InviteMembersModal
          closeModal={() => setIsInviteMembersModalOpen(false)}
        />
      )}
      <Grid
        as="section"
        gap={4}
        templateColumns={[
          'repeat(auto-fill, minMax(300px, 320px))',
          'repeat(auto-fill, minMax(300px, 320px))',
          'repeat(auto-fill, minMax(300px, 1fr))',
        ]}
        justifyContent={['center', 'center', 'initial']}
      >
        {data?.collab?.members.map(member => (
          <UserCard
            key={member.id}
            {...member}
            {...(isOwner &&
              currentUser?.id !== member.id && {
                dotsMenu: (
                  <DotsMenu
                    iconProps={{
                      ariaLabel: 'User Menu',
                      color: '#c1c1c1',
                      _hover: dotsMenuIconStyles,
                      _focus: dotsMenuIconStyles,
                      _active: dotsMenuIconStyles,
                    }}
                  >
                    <Button
                      size="sm"
                      onClick={() =>
                        removeMember({
                          variables: {
                            collabId,
                            memberId: member.id,
                          },
                        })
                      }
                    >
                      Remove Member
                    </Button>
                  </DotsMenu>
                ),
              })}
          />
        ))}
      </Grid>
    </Box>
  )
}

const dotsMenuIconStyles = { bg: 'inherit', color: 'white' }
