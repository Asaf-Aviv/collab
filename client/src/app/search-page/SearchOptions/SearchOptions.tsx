import React, { useState } from 'react'
import {
  Radio,
  Button,
  Flex,
  FormControl,
  FormLabel,
  RadioButtonGroup,
  Stack,
  Tag,
  TagLabel,
  TagCloseButton,
  Box,
} from '@chakra-ui/core'
import ReactSelect from 'react-select'
import Creatable from 'react-select/creatable'
import qs from 'qs'
import {
  AdvancedPostsSearchInput,
  useCollabPostLanguagesQuery,
  Experience,
} from '../../../graphql/generates'
import { Option } from 'react-select/src/filters'
import styled from '@emotion/styled'
import { useLocation, useHistory } from 'react-router-dom'

const experienceOptions = [
  'ALL',
  'JUNIOR',
  'JUNIOR_MID',
  'MID',
  'MID_SENIOR',
  'SENIOR',
].map(value => ({ value, label: value.replace('_', '-') }))

export const SearchOptions = () => {
  const { data: languagesData } = useCollabPostLanguagesQuery()
  const { search } = useLocation()
  const [searchInput, setSearchInput] = useState<
    Omit<AdvancedPostsSearchInput, 'offset' | 'limit'>
  >({
    experience: 'ALL' as Experience,
    hasStarted: false,
    isNew: false,
    languages: [],
    stack: [],
    ...qs.parse(search, {
      ignoreQueryPrefix: true,
    }),
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
    setSearchInput(prevState => ({
      ...prevState,
      languages: values.map((v: any) => v.value),
    }))
  }

  const handleSearchClick = () => {
    history.replace(
      `/search${qs.stringify(searchInput, { addQueryPrefix: true })}`,
    )
  }

  return (
    <Flex direction="column">
      <Flex direction={['column', 'column', 'row']} flex={1} wrap="wrap">
        <FormControl minWidth={300} minHeight={120} flex={1} mr={[0, 0, 4]}>
          <FormLabel htmlFor="communication-languages">
            Communication Languages
          </FormLabel>
          <ReactSelect
            id="communication-languages"
            isMulti
            placeholder=""
            isSearchable
            autoFocus
            menuIsOpen
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
              control: (base: any, state: any) => ({
                ...base,
                borderWidth: 2,
                '&:hover': {
                  borderColor: '#cab3ff',
                },
                backgroundColor: '#f2f2ff',
                borderColor:
                  state.isFocused || state.menuIsOpen
                    ? '#805ad5 !important'
                    : 'transparent',
                boxShadow: 'none',
              }),
              multiValue: provided => ({
                ...provided,
                display: 'none',
              }),
              option: (base: any, state) => ({
                ...base,
                backgroundColor: state.isFocused ? '#d6bcfa' : 'transparent',
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
        <FormControl minWidth={300} minHeight={120} flex={1}>
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
              control: (base: any, state: any) => ({
                ...base,
                borderWidth: 2,
                '&:hover': {
                  borderColor: '#cab3ff',
                },
                backgroundColor: '#f2f2ff',
                borderColor:
                  state.isFocused || state.menuIsOpen
                    ? '#805ad5 !important'
                    : 'transparent',
                boxShadow: 'none',
              }),
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
      </Flex>
      <StyledFlex>
        <FormControl>
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
        <FormControl>
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
        <FormControl width={['100%', 180]} mt={[4, 0]}>
          <FormLabel htmlFor="experience">Experience</FormLabel>
          <StyledReactSelect
            value={
              searchInput.experience
                ? {
                    value: searchInput.experience,
                    label: searchInput.experience.replace('_', '-'),
                  }
                : experienceOptions[0]
            }
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
        <Box>
          <Button variantColor="purple" onClick={() => handleSearchClick()}>
            Search
          </Button>
        </Box>
      </StyledFlex>
    </Flex>
  )
}

const StyledFlex = styled(Flex)`
  flex-wrap: wrap;

  @media (min-width: 480px) {
    justify-content: space-between;
    align-items: flex-end;
  }

  @media (max-width: 479px) {
    justify-content: center;

    > :nth-child(-n + 2) {
      width: 50%;
      margin-bottom: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    > :nth-last-child(-n + 2) {
      width: 100%;
      margin-bottom: 1.5rem;
    }

    button {
      width: 100%;
    }
  }

  @media (min-width: 800px) {
    > * {
      width: 20%;
      display: flex;
      flex-direction: column;
      height: 68px;
    }
    button {
      margin-top: auto;
    }
  }

  @media (min-width: 480px) and (max-width: 799px) {
    > * {
      width: 45%;
      margin-bottom: 1rem;
    }
  }
`

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
