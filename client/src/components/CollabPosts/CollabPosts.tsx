import React from 'react'
import { useCollabPostsQuery } from '../../graphql/generates'
import { SimpleGrid } from '@chakra-ui/core'
import { Container } from '../global'
import { CollabPostCard } from '../CollabPostCard/CollabPostCard'

export const CollabPosts = () => {
  const { data, loading, error, fetchMore } = useCollabPostsQuery({
    variables: {
      offset: 0,
      limit: 10,
    },
    notifyOnNetworkStatusChange: true,
  })

  if (loading) return <h1>loading</h1>
  if (error) return <h1>Could not fetch Collabs</h1>
  if (!data?.collabPosts) return null

  const { posts, hasNextPage } = data.collabPosts

  return (
    <main>
      <Container>
        <SimpleGrid as="section" columns={{ lg: 1, xl: 2 }} spacing={6}>
          {posts.map(post => (
            <CollabPostCard key={post.id} {...post} />
          ))}
          {hasNextPage && (
            <button
              onClick={() =>
                fetchMore({
                  variables: {
                    offset: posts.length,
                    limit: 10,
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev
                    return {
                      collabPosts: {
                        ...prev.collabPosts,
                        hasNextPage: fetchMoreResult.collabPosts.hasNextPage,
                        posts: [
                          ...prev.collabPosts.posts,
                          ...fetchMoreResult.collabPosts.posts,
                        ],
                      },
                    }
                  },
                })
              }
            >
              fetch more
            </button>
          )}
        </SimpleGrid>
      </Container>
    </main>
  )
}
