import React, { useCallback, useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Flex,
  Input,
  Box,
  InputRightElement,
  InputGroup,
  Icon,
  Text,
  PseudoBox,
  BoxProps,
} from '@chakra-ui/core'
import styled from '@emotion/styled'
import produce from 'immer'
import { debounce } from 'lodash-es'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchPostsByTitleLazyQuery } from '../../../graphql/generates'
import { Loader } from '../../../components/Loader'
import { CommentsAndReactionsCount } from '../../../components/CommentsAndReactionsCount'
import { useKey } from '../../../hooks/useKey'
import { useOnOutsideClick } from '../../../hooks/useOnOutsideClick'
import { DisplayError } from '../../../components/DisplayError'
import { useOnVisibilty } from '../../../hooks/useOnVisibilty'
import { useIsFirstRender } from '../../../hooks/useIsFirstRender'

type Props = BoxProps

export const SearchBar = (props: Props) => {
  const [
    searchPosts,
    { data, loading, error, refetch, fetchMore },
  ] = useSearchPostsByTitleLazyQuery({
    notifyOnNetworkStatusChange: true,
  })
  const [searchInput, setSearchInput] = useState('')
  const [showResults, setShowResults] = useState(false)
  // index of the focused result item
  const [activeIndex, setActiveIndex] = useState(-1)
  const location = useLocation()
  const isFirstRender = useIsFirstRender()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const resultsContainer = useRef<HTMLDivElement | null>(null)
  const loadNextPageTriggerRef = useRef<HTMLSpanElement | null>(null)

  const debouncedSearchPosts = useCallback(
    debounce((title: string) => {
      if (!title) {
        return
      }

      setShowResults(true)

      searchPosts({
        variables: {
          input: {
            title,
            offset: 0,
            limit: 10,
          },
        },
      })
    }, 250),
    [searchPosts],
  )

  const closeResults = () => {
    setShowResults(false)
  }

  useKey(['Esc', 'Escape'], closeResults, showResults)

  useOnOutsideClick(containerRef, closeResults, showResults)

  useEffect(() => {
    if (isFirstRender || !data) return
    // reset the index to -1 on close
    if (!showResults) {
      inputRef.current?.focus()
    }

    if (data.searchPostsByTitle.posts.length === 0) return

    const handleKeyDown = (e: KeyboardEvent) => {
      const { length } = data.searchPostsByTitle.posts

      if (e.key === 'ArrowDown' || e.key === 'Tab') {
        // used to trap focus inside the results container
        e.key !== 'Tab' && e.preventDefault()
        setActiveIndex(prevState => (prevState + 1) % length)
      } else if (e.key === 'ArrowUp') {
        setActiveIndex(prevState => (prevState - 1 + length) % length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [showResults, data, isFirstRender])

  useEffect(() => {
    if (activeIndex !== -1) {
      const node = resultsContainer.current?.childNodes[activeIndex]

      ;(node as HTMLAnchorElement)?.focus()
    }
  }, [activeIndex])

  useEffect(() => {
    debouncedSearchPosts(searchInput)
  }, [debouncedSearchPosts, searchInput])

  useEffect(() => {
    setShowResults(false)
  }, [location])

  const { posts, hasNextPage } = data?.searchPostsByTitle || {}

  const handleNextPageLoad = () => {
    if (!posts) return

    fetchMore({
      variables: {
        input: {
          title: searchInput,
          offset: posts.length,
          limit: 10,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev

        const { hasNextPage, posts } = fetchMoreResult.searchPostsByTitle

        const searchPostsByTitle = produce(prev.searchPostsByTitle, draft => {
          draft.hasNextPage = hasNextPage
          draft.posts.push(...posts)
        })

        return { searchPostsByTitle }
      },
    }).catch(() => {})
  }

  useOnVisibilty(
    loadNextPageTriggerRef,
    handleNextPageLoad,
    hasNextPage && !loading,
  )

  return (
    <Box
      ref={containerRef}
      maxWidth={['100%', '100%', 500]}
      flex={1}
      px={[2, 2, 4]}
      position="relative"
      {...props}
    >
      <InputGroup>
        <Input
          ref={inputRef}
          px={[2, 2, 4]}
          bg="#f2f2ff"
          placeholder="Search Collabs"
          borderColor="transparent"
          _hover={{ borderColor: '#cab3ff' }}
          _focus={{ borderColor: '#805ad5' }}
          borderWidth={2}
          onChange={(e: any) => setSearchInput(e.target.value)}
          onClick={() => searchInput && setShowResults(true)}
        />
        <InputRightElement>
          <Icon name="search" color="gray.500" />
        </InputRightElement>
      </InputGroup>
      <AnimatePresence>
        {showResults && (
          <StyledMotionDiv
            animate={{
              opacity: 1,
            }}
            initial={{
              opacity: 0.6,
            }}
            exit={{
              opacity: 0,
              onAnimationEnd() {
                setActiveIndex(-1)
              },
            }}
            transition={{
              duration: 0.2,
              ease: 'easeIn',
            }}
          >
            <Flex
              direction="column"
              align="center"
              justify="center"
              flex={1}
              as="section"
              ref={resultsContainer}
            >
              {data?.searchPostsByTitle.posts.map((post, i) => (
                <PseudoBox
                  key={post.id}
                  height="100%"
                  as={Link}
                  //@ts-ignore
                  to={`/collabs/posts/${post.id}`}
                  width="100%"
                  display="block"
                  p={2}
                  fontSize="0.85rem"
                  borderBottom="1px solid #e8e8e8"
                  bg={activeIndex === i ? '#f0f0f0' : undefined}
                  _hover={{
                    bg: '#f0f0f0',
                  }}
                  _focus={{
                    bg: '#f0f0f0',
                  }}
                >
                  <Text as="h4">
                    By{' '}
                    <Text as="span" fontWeight={600}>
                      {post.owner.username}
                    </Text>
                  </Text>
                  <Text color="#666666" mb={1}>
                    {post.title}
                  </Text>
                  <CommentsAndReactionsCount
                    reactionsCount={4}
                    commentsCount={4}
                    emojiSize={16}
                    commentIconSize="14px"
                  />
                </PseudoBox>
              ))}
              {posts?.length === 0 && (
                <Text m="auto" p={2} textAlign="center">
                  We couldn&apos;t find anything
                </Text>
              )}
              {!error && <span ref={loadNextPageTriggerRef} />}
              {loading && <Loader />}
              {error && (
                <DisplayError
                  message="Could not fetch search results"
                  onClick={() => refetch()}
                />
              )}
            </Flex>
          </StyledMotionDiv>
        )}
      </AnimatePresence>
    </Box>
  )
}

const StyledMotionDiv = styled(motion.div)`
  background-color: #f4f4f4;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  display: flex;
  flex-direction: column;
  position: fixed;
  min-height: 70px;
  max-height: 40vh;
  width: 100%;
  box-shadow: 0 10px 25px 0px rgba(142, 142, 142, 0.25);
  overflow: hidden;
  top: 64px;
  overflow-y: auto;
  overflow-x: hidden;
  left: 0;
  @media (min-width: 786px) {
    position: absolute;
    width: calc(100% - 2rem);
    left: 1rem;
    top: 52px;
  }
`
