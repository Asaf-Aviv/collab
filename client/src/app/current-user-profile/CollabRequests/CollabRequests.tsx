import React from 'react'
import { Button, Text, Box, Heading, Flex, PseudoBox } from '@chakra-ui/core'
import { DataProxy } from 'apollo-cache'
import {
  useGetCurrentUserCollabRequestsQuery,
  useDeclineMemberRequestMutation,
  useAcceptMemberRequestMutation,
  GetCurrentUserCollabRequestsDocument,
  GetCurrentUserCollabRequestsQuery,
} from '../../../graphql/generates'
import { AvatarWithUsername } from '../../../components/AvatarWithUsername'
import { Loader } from '../../../components/Loader'
import { DisplayError } from '../../../components/DisplayError'

const removeRequestFromCache = (store: DataProxy, requestId: string) => {
  const query = GetCurrentUserCollabRequestsDocument

  const requestsData = store.readQuery<GetCurrentUserCollabRequestsQuery>({
    query,
  })!

  store.writeQuery({
    query,
    data: {
      currentUser: {
        ...requestsData.currentUser!,
        collabRequests: requestsData.currentUser!.collabRequests.filter(
          ({ id }) => id !== requestId,
        ),
      },
    },
  })
}

export const CollabRequests = () => {
  const {
    data,
    loading,
    error,
    refetch,
  } = useGetCurrentUserCollabRequestsQuery({
    notifyOnNetworkStatusChange: true,
  })
  const [declineRequest] = useDeclineMemberRequestMutation({
    update(store, { data }) {
      if (!data?.declineMemberRequest) return
      removeRequestFromCache(store, data.declineMemberRequest)
    },
  })
  const [accpetRequest] = useAcceptMemberRequestMutation({
    update(store, { data }) {
      if (!data?.acceptMemberRequest) return
      removeRequestFromCache(store, data.acceptMemberRequest)
    },
  })

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
              size="sm"
              variant="outline"
              variantColor="red"
              mr={3}
              onClick={() => {
                declineRequest({
                  variables: {
                    collabId: collab.id,
                    memberId: member.id,
                  },
                })
              }}
            >
              Decline
            </Button>
            <Button
              size="sm"
              variantColor="purple"
              onClick={() => {
                accpetRequest({
                  variables: {
                    collabId: collab.id,
                    memberId: member.id,
                  },
                })
              }}
            >
              Accept
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
