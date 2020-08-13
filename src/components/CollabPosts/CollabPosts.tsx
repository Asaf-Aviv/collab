import React, { useRef } from 'react'
import produce from 'immer'
import { Text } from '@chakra-ui/core'
import { Container } from '../global'
import { useCollabPostsQuery } from '../../graphql/generates'
import { CollabPostCard } from '../CollabPostCard'
import { Loader } from '../Loader'
import { DisplayError } from '../DisplayError'
import { useOnVisibilty } from '../../hooks/useOnVisibilty'
import { SEO } from '../SEO'

export const CollabPosts = () => {
  const {
    data: postsData,
    loading,
    error,
    fetchMore,
    refetch,
  } = useCollabPostsQuery({
    variables: {
      offset: 0,
      limit: 10,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })
  const loadNextPageTriggerRef = useRef<HTMLSpanElement | null>(null)

  const { posts, hasNextPage } = postsData?.collabPosts ?? {}

  const handleNextPageLoad = () => {
    if (!posts) return

    fetchMore({
      variables: {
        offset: posts.length,
        limit: 10,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev

        // eslint-disable-next-line no-shadow
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
    <>
      <SEO title="Collabs" url={window.location.href} />
      <Container as="main" maxWidth={900} pb={4}>
        {posts?.map(post => (
          <CollabPostCard key={post.id} {...post} mb={8} />
        ))}
        {error && (
          <DisplayError
            message="Could not fetch collabs"
            onClick={() => refetch()}
          />
        )}
        {loading && <Loader />}
        {!error && <span ref={loadNextPageTriggerRef} />}
        {hasNextPage === false && (
          <Text textAlign="center" py={6} fontWeight={500}>
            No more Collabs
          </Text>
        )}
      </Container>
    </>
  )
}
