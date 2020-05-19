import React from 'react'
import { Button, Text, Box, Heading, Flex, PseudoBox } from '@chakra-ui/core'
import {
  useGetCurrentUserCollabRequestsQuery,
  useCancelCollabRequestToJoinMutation,
} from '../../../graphql/generates'
import { AvatarWithUsername } from '../../../components/AvatarWithUsername'
import { Loader } from '../../../components/Loader'
import { DisplayError } from '../../../components/DisplayError'

export const CollabRequests = () => {
  const {
    data,
    loading,
    error,
    refetch,
  } = useGetCurrentUserCollabRequestsQuery({
    notifyOnNetworkStatusChange: true,
  })
  const [cancelRequest] = useCancelCollabRequestToJoinMutation()

  const { collabRequests } = data?.currentUser || {}

  return (
    <Box as="main" flex={1} pb={4}>
      <Heading as="h1" size="md" mb={4} fontWeight={500}>
        Collab Requests
      </Heading>
      <section>
        {collabRequests?.map(({ member, collab }) => (
          <PseudoBox
            key={member.username + collab.name}
            py={4}
            px={2}
            _notFirst={{
              borderTop: '1px solid #e1e1e1',
            }}
            _hover={{
              bg: '#EEE',
            }}
          >
            <Flex align="center" mb={4}>
              <AvatarWithUsername
                id={member.id}
                avatar={member.avatar ?? undefined}
                username={member.username}
                size="sm"
                mr={2}
              />
              <Text>wants to join {collab.name}</Text>
            </Flex>
            <Button
              variant="ghost"
              mr={3}
              onClick={() => {
                cancelRequest({
                  variables: {
                    collabId: collab.id,
                  },
                })
              }}
            >
              Cancel
            </Button>
          </PseudoBox>
        ))}
        {loading && <Loader />}
        {error && (
          <DisplayError
            message="Could not fetch requests"
            onClick={() => refetch()}
          />
        )}
      </section>
    </Box>
  )
}
