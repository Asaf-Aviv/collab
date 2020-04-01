import React from 'react'
import { useParams } from 'react-router-dom'
import { useCollabPostsByStackQuery } from '../../graphql/generates'
import { Container } from '../global'
import { CollabPostCard } from '../CollabPostCard/CollabPostCard'
import { SimpleGrid } from '@chakra-ui/core'

export const CollabPostsByStack = () => {
  const { stack } = useParams<{ stack: string }>()
  const { data, loading, error, fetchMore } = useCollabPostsByStackQuery({
    variables: {
      stack,
      offset: 0,
      limit: 10,
    },
  })
  if (loading) return <h1>loading</h1>
  if (error) return <h1>Could not fetch Collabs</h1>
  if (!data?.collabPostsByStack) return null

  const { posts, hasNextPage } = data.collabPostsByStack
  console.log(data)

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
                      collabPostsByStack: {
                        ...prev.collabPostsByStack,
                        hasNextPage:
                          fetchMoreResult.collabPostsByStack.hasNextPage,
                        posts: [
                          ...prev.collabPostsByStack.posts,
                          ...fetchMoreResult.collabPostsByStack.posts,
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
