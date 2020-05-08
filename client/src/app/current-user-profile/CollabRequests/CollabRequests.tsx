import React from 'react'
import { Button, Text, Avatar } from '@chakra-ui/core'
import {
  useGetCurrentUserCollabRequestsQuery,
  useCancelCollabRequestToJoinMutation,
} from '../../../graphql/generates'

export const CollabRequests = () => {
  const { data, loading, error } = useGetCurrentUserCollabRequestsQuery()
  const [cancelRequest] = useCancelCollabRequestToJoinMutation()

  console.log(data)
  if (loading) return null
  if (error) return <span>Could not fetch requests</span>
  if (!data?.currentUser) return null

  const { collabRequests } = data.currentUser

  return (
    <div>
      {collabRequests.map(({ member, collab }) => (
        <div key={member.username + collab.name}>
          <Avatar src={member.avatar ?? undefined} name={member.username} />
          <Text>
            {member.username} invited you to join {collab.name}
          </Text>
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
        </div>
      ))}
    </div>
  )
}
