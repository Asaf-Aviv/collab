import React, { useState, useRef, useEffect } from 'react'
import {
  Radio,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  RadioButtonGroup,
  Stack,
  Tag,
  TagLabel,
  TagCloseButton,
  Text,
  Box,
} from '@chakra-ui/core'
import ReactSelect from 'react-select'
import Creatable from 'react-select/creatable'
import produce from 'immer'
import qs from 'qs'
import {
  useAdvancedPostsSearchLazyQuery,
  AdvancedPostsSearchInput,
  useCollabPostLanguagesQuery,
  Experience,
} from '../../../graphql/generates'
import { Container } from '../../../components/global'
import { Option } from 'react-select/src/filters'
import styled from '@emotion/styled'
import { CollabPostCard } from '../../../components/CollabPostCard'
import { DisplayError } from '../../../components/DisplayError'
import { Loader } from '../../../components/Loader'
import { useOnVisibilty } from '../../../hooks/useOnVisibilty'
import { useLocation, useHistory } from 'react-router-dom'

const experienceOptions = [
  'ALL',
  'JUNIOR',
  'JUNIOR_MID',
  'MID',
  'MID_SENIOR',
  'SENIOR',
].map(value => ({ value, label: value.replace('_', '-') }))

const SearchBar = () => {
  const { data: languagesData } = useCollabPostLanguagesQuery()
  const [searchInput, setSearchInput] = useState<
    Omit<AdvancedPostsSearchInput, 'offset' | 'limit'>
  >({
    experience: 'ALL' as Experience,
    hasStarted: false,
    isNew: false,
    languages: [],
    stack: [],
  })
  const history = useHistory()

  const handleExperienceChange = ({ value }: Option) => {
    setSearchInput(prevState => ({
      ...prevState,
      experience: value as Experience,
    }))
  }

  const handleHasStaredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget

    setSearchInput(prevState => ({
      ...prevState,
      hasStarted: value === 'no',
    }))
  }

  const handleRecentlyAddedChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.currentTarget

    setSearchInput(prevState => ({
      ...prevState,
      isNew: value === 'yes',
    }))
  }

  const handleLanguageChange = (values: any) => {
    console.log(values)
    setSearchInput(prevState => ({
      ...prevState,
      languages: values.map((v: any) => v.value),
    }))
  }

  const handleSearchClick = () => {
    // console.log(history)
    // const baseUrl = history.replace()
    history.replace(
      `/search${qs.stringify(searchInput, { addQueryPrefix: true })}`,
    )
  }

  return (
    <Flex>
      <FormControl>
        <FormLabel htmlFor="communication-languages">
          Communication Languages
        </FormLabel>
        <ReactSelect
          id="communication-languages"
          isMulti
          placeholder=""
          isSearchable
          hideSelectedOptions
          value={searchInput.languages!.map(selectedLanguage => ({
            label: selectedLanguage,
            value: selectedLanguage,
          }))}
          onChange={handleLanguageChange}
          options={languagesData?.languages.map(name => ({
            value: name,
            label: name,
          }))}
          styles={{
            multiValue: provided => ({
              ...provided,
              display: 'none',
            }),
          }}
        />
        <Stack spacing={2} isInline mt={4} flexWrap="wrap">
          {searchInput.languages!.map(selectedLanguage => (
            <Tag
              size="md"
              key={selectedLanguage}
              rounded="full"
              variant="solid"
              variantColor="purple"
              cursor="pointer"
              mb={2}
              onClick={() =>
                setSearchInput(prevState => ({
                  ...prevState,
                  languages: prevState.languages!.filter(
                    lng => lng !== selectedLanguage,
                  ),
                }))
              }
            >
              <TagLabel>{selectedLanguage}</TagLabel>
              <TagCloseButton />
            </Tag>
          ))}
        </Stack>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="tech-stack">Tech Stack</FormLabel>
        <Creatable
          id="tech-stack"
          isMulti
          placeholder=""
          value={searchInput.stack!.map(s => ({
            value: s,
            label: s,
          }))}
          onChange={(values: any) => {
            setSearchInput(prevState => ({
              ...prevState,
              stack: values.map((v: any) => v.value),
            }))
          }}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
            Menu: () => null,
          }}
          styles={{
            multiValue: provided => ({
              ...provided,
              display: 'none',
            }),
          }}
        />
        <Stack spacing={2} isInline mt={4} flexWrap="wrap">
          {searchInput.stack!.map(selectedStack => (
            <Tag
              size="md"
              key={selectedStack}
              rounded="full"
              variant="solid"
              variantColor="purple"
              cursor="pointer"
              mb={2}
              onClick={() =>
                setSearchInput(prevState => ({
                  ...prevState,
                  stack: prevState.stack!.filter(
                    name => name !== selectedStack,
                  ),
                }))
              }
            >
              <TagLabel>{selectedStack}</TagLabel>
              <TagCloseButton />
            </Tag>
          ))}
        </Stack>
      </FormControl>
      <FormControl mr={10}>
        <FormLabel htmlFor="recently-added" mb={2}>
          Recently Added?
        </FormLabel>
        <RadioButtonGroup
          spacing={4}
          isInline
          id="recently-added"
          value={searchInput.isNew ? 'yes' : 'no'}
        >
          <Radio
            value="no"
            variantColor="purple"
            onChange={handleRecentlyAddedChange}
          >
            No
          </Radio>
          <Radio
            value="yes"
            variantColor="purple"
            onChange={handleRecentlyAddedChange}
          >
            Yes
          </Radio>
        </RadioButtonGroup>
      </FormControl>
      <FormControl width={['100%', 180]} mt={[4, 0]}>
        <FormLabel htmlFor="experience">Experience</FormLabel>
        <StyledReactSelect
          defaultValue={experienceOptions[0]}
          id="experience"
          classNamePrefix="react-select"
          name="experience"
          options={experienceOptions}
          onChange={handleExperienceChange as any}
          styles={{
            control: (base: any, state: any) => ({
              ...base,
              borderWidth: 2,
              '&:hover': {
                borderColor: '#cab3ff',
              },
              borderColor:
                state.isFocused || state.menuIsOpen
                  ? '#805ad5 !important'
                  : 'transparent',
              boxShadow: 'none',
            }),
          }}
        />
      </FormControl>
      <FormControl mr={10}>
        <FormLabel htmlFor="new-project" mb={2}>
          New Project?
        </FormLabel>
        <RadioButtonGroup
          spacing={4}
          isInline
          id="new-project"
          value={searchInput.hasStarted ? 'no' : 'yes'}
        >
          <Radio
            value="no"
            variantColor="purple"
            onChange={handleHasStaredChange}
          >
            No
          </Radio>
          <Radio
            value="yes"
            variantColor="purple"
            onChange={handleHasStaredChange}
          >
            Yes
          </Radio>
        </RadioButtonGroup>
      </FormControl>
      <Button variantColor="purple" onClick={() => handleSearchClick()}>
        Search
      </Button>
    </Flex>
  )
}

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

    console.log('search', search)

    const searchInputParams = qs.parse(search, {
      ignoreQueryPrefix: true,
    })
    console.log(searchInputParams)

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
    <Container maxWidth={900}>
      <Box as="header">
        <SearchBar />
      </Box>
      <main>
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
        {posts?.length === 0 && (
          <Text textAlign="center" my={4}>
            We couldn&apos;t find anything, try to loose up the filters a bit
          </Text>
        )}
      </main>
    </Container>
  )
}

const StyledReactSelect = styled(ReactSelect)`
  .react-select__control {
    background-color: #f2f2ff;
    cursor: pointer;
  }

  .react-select__menu-list {
    background-color: white;
  }

  .react-select__option {
    cursor: pointer;
  }

  .react-select__option--is-selected {
    color: inherit;
    background-color: #dcd2f5;
  }

  .react-select__option--is-focused {
    background-color: #dcd2f5;
  }

  .react-select__indicator {
    color: hsl(0, 0%, 60%);
    &:hover {
      color: hsl(0, 0%, 40%);
    }
  }
`
