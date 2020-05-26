import React, { useRef, useEffect } from 'react'
import { Text, Box } from '@chakra-ui/core'
import produce from 'immer'
import qs from 'qs'
import {
  useAdvancedPostsSearchLazyQuery,
  Experience,
} from '../../../graphql/generates'
import { Container } from '../../../components/global'
import { CollabPostCard } from '../../../components/CollabPostCard'
import { DisplayError } from '../../../components/DisplayError'
import { Loader } from '../../../components/Loader'
import { useOnVisibilty } from '../../../hooks/useOnVisibilty'
import { useLocation } from 'react-router-dom'
import { SectionHorizonalHeader } from '../../../components/SectionHorizonalHeader'
import { SearchOptions } from '../SearchOptions'

export const SearchPage = () => {
  const [
    fetchSearchPosts,
    { data, loading, error, fetchMore, refetch },
  ] = useAdvancedPostsSearchLazyQuery({
    notifyOnNetworkStatusChange: true,
  })
  const { search } = useLocation()
  const loadNextPageTriggerRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    if (!search) return

    const searchInputParams = qs.parse(search, {
      ignoreQueryPrefix: true,
    })

    fetchSearchPosts({
      variables: {
        input: {
          ...searchInputParams,
          experience: searchInputParams.experience as Experience,
          isNew: searchInputParams.isNew === 'true',
          hasStarted: searchInputParams.hasStarted === 'true',
          offset: 0,
          limit: 10,
        },
      },
    })
  }, [search, fetchSearchPosts])

  const posts = data?.advancedPostsSearch.posts
  const hasNextPage = data?.advancedPostsSearch.hasNextPage

  const handleNextPageLoad = () => {
    if (!posts) return

    fetchMore({
      variables: {
        input: {
          offset: posts?.length,
          limit: 10,
        },
      } as any,
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev

        const { hasNextPage, posts } = fetchMoreResult.advancedPostsSearch

        const advancedPostsSearch = produce(prev.advancedPostsSearch, draft => {
          draft.hasNextPage = hasNextPage
          draft.posts.push(...posts)
        })

        return { advancedPostsSearch }
      },
    }).catch(() => {})
  }

  useOnVisibilty(
    loadNextPageTriggerRef,
    handleNextPageLoad,
    hasNextPage && !loading,
  )

  return (
    <Container maxWidth={1400}>
      <Box as="header">
        <SearchOptions />
      </Box>
      <Box as="main" maxWidth={900} mx="auto" mt={8}>
        <SectionHorizonalHeader title="Search Results" titleTag="h2" />
        {posts && (
          <>
            {posts?.map(post => (
              <CollabPostCard key={post.id} {...post} mb={8} />
            ))}
          </>
        )}
        {error && (
          <DisplayError
            message="Could not fetch collab posts"
            onClick={() => refetch()}
          />
        )}
        {loading && <Loader />}
        {!error && <span ref={loadNextPageTriggerRef} />}
        {posts?.length === 0 && (
          <Text textAlign="center" my={4}>
            We couldn&apos;t find anything, try to loose up the filters a bit
          </Text>
        )}
      </Box>
    </Container>
  )
}
