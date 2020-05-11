import React, { useRef } from 'react'
import produce from 'immer'
import { Container } from '../global'
import { useCollabPostsQuery } from '../../graphql/generates'
import { CollabPostCard } from '../CollabPostCard'
import { Loader } from '../Loader'
import { DisplayError } from '../DisplayError'
import { useOnVisibilty } from '../../hooks/useOnVisibilty'

export const CollabPosts = () => {
  const { data, loading, error, fetchMore, refetch } = useCollabPostsQuery({
    variables: {
      offset: 0,
      limit: 10,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })
  const loadNextPageTriggerRef = useRef<HTMLSpanElement | null>(null)

  const { posts, hasNextPage } = data?.collabPosts ?? {}

  const handleNextPageLoad = () => {
    if (!posts) return

    fetchMore({
      variables: {
        offset: posts.length,
        limit: 10,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev

        const { hasNextPage, posts } = fetchMoreResult.collabPosts

        const collabPosts = produce(prev.collabPosts, draft => {
          draft.hasNextPage = hasNextPage
          draft.posts.push(...posts)
        })

        return { collabPosts }
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
      <Container maxWidth={900}>
        {posts?.map(post => (
          <CollabPostCard key={post.id} {...post} mb={8} />
        ))}
        {error && (
          <DisplayError
            message="Could not fetch collab posts"
            onClick={() => refetch()}
          />
        )}
        {loading && <Loader />}
        {!error && <span ref={loadNextPageTriggerRef} />}
      </Container>
    </main>
  )
}
