import React, { useRef } from 'react'
import produce from 'immer'
import { useCollabWallMessagesQuery } from '../../../graphql/generates'
import { useParams } from 'react-router-dom'
import { AvatarWithUsername } from '../../../components/AvatarWithUsername'
import { Text } from '@chakra-ui/core'
import { DisplayError } from '../../../components/DisplayError'
import { DisplayDate } from '../../../components/DisplayDate'
import { Loader } from '../../../components/Loader'
import { useOnVisibilty } from '../../../hooks/useOnVisibilty'

export const Wall = () => {
  const { collabId } = useParams<{ collabId: string }>()
  const {
    data,
    loading,
    error,
    refetch,
    fetchMore,
  } = useCollabWallMessagesQuery({
    variables: {
      input: {
        collabId,
        offset: 0,
        limit: 10,
      },
    },
    notifyOnNetworkStatusChange: true,
  })
  const loadNextPageTriggerRef = useRef<HTMLSpanElement | null>(null)

  const { hasNextPage, messages } = data?.collabWallMessages ?? {}

  const handleNextPageLoad = () => {
    if (!messages) return

    fetchMore({
      variables: {
        input: {
          collabId,
          offset: messages.length,
          limit: 10,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev

        const { hasNextPage, messages } = fetchMoreResult.collabWallMessages

        const collabWallMessages = produce(prev.collabWallMessages, draft => {
          draft.hasNextPage = hasNextPage
          draft.messages.unshift(...messages)
        })

        return { collabWallMessages }
      },
    }).catch(() => {})
  }

  useOnVisibilty(
    loadNextPageTriggerRef,
    handleNextPageLoad,
    hasNextPage && !loading,
  )

  return (
    <main>
      {messages?.map(message => (
        <div key={message.id}>
          <div>
            <AvatarWithUsername
              size="xs"
              fontSize="0.85rem"
              {...message.author}
            />
          </div>
          <Text>{message.content}</Text>
          <DisplayDate date={message.creationDate} />
        </div>
      ))}
      {loading && <Loader />}
      {!error && <span ref={loadNextPageTriggerRef} />}
      {error && (
        <DisplayError
          message="Could not fetch wall messages"
          onClick={() => refetch()}
        />
      )}
    </main>
  )
}
