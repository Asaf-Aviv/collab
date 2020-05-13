import React, { useState, ChangeEvent } from 'react'
import { Container } from '../../../components/global'
import { useHistory } from 'react-router-dom'
import ReactSelect from 'react-select'
import Creatable from 'react-select/creatable'
import {
  Radio,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  RadioButtonGroup,
  Textarea,
  Stack,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/core'
import {
  useCreateCollabPostMutation,
  Experience,
  CollabPostArgs,
  useCollabPostLanguagesQuery,
} from '../../../graphql/generates'
import { Option } from 'react-select/src/filters'
import { InputWithLabel } from '../../../components/InputWithLabel'
import styled from '@emotion/styled'

const experienceOptions = [
  'ALL',
  'JUNIOR',
  'JUNIOR_MID',
  'MID',
  'MID_SENIOR',
  'SENIOR',
].map(value => ({ value, label: value.replace('_', '-') }))

export const CreateCollab = () => {
  const [postInput, setPostInput] = useState<
    Omit<CollabPostArgs, 'languages' | 'stack'>
  >({
    name: 'Collabbbb',
    title: 'React TypeScript next level app',
    experience: 'MID' as Experience,
    description: 'Our first Collab!',
    hasStarted: false,
  })
  const [selectedLanguages, setSelectedLanguages] = useState<
    { label: string; value: string }[]
  >([])
  const [selectedStack, setSelectedStack] = useState<
    { label: string; value: string }[]
  >([])
  const { data } = useCollabPostLanguagesQuery()
  const history = useHistory()
  const [createCollabPost] = useCreateCollabPostMutation({
    onCompleted: ({ createCollabPost }) => {
      history.push(`/collabs/posts/${createCollabPost.id}`)
    },
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setPostInput(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleHasStaredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    setPostInput(prevState => ({
      ...prevState,
      hasStarted: value === 'no',
    }))
  }

  const handleExperienceChange = ({ value }: Option) => {
    setPostInput(prevState => ({
      ...prevState,
      experience: value as Experience,
    }))
  }

  const { name, title, description, hasStarted } = postInput

  return (
    <Container>
      <Heading as="h1" size="xl" textAlign="center" mb={10}>
        Create a Collab
      </Heading>
      <Stack spacing={6} m="auto" maxW={768}>
        <InputWithLabel
          id="name"
          htmlFor="name"
          name="name"
          label="Collab Name"
          value={name}
          onChange={handleInputChange}
        />
        <InputWithLabel
          id="name"
          htmlFor="title"
          name="title"
          label="Post Title"
          value={title}
          onChange={handleInputChange}
        />
        <Flex wrap="wrap">
          <FormControl mr={10}>
            <FormLabel htmlFor="new-project" mb={2}>
              New Project?
            </FormLabel>
            <RadioButtonGroup
              spacing={4}
              isInline
              id="new-project"
              value={hasStarted ? 'no' : 'yes'}
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
        </Flex>
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
            value={selectedLanguages}
            onChange={values => setSelectedLanguages(values as any)}
            options={data?.languages.map(name => ({
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
            {selectedLanguages?.map(({ label }) => (
              <Tag
                size="md"
                key={label}
                rounded="full"
                variant="solid"
                variantColor="purple"
                cursor="pointer"
                mb={2}
                onClick={() =>
                  setSelectedLanguages(prevState =>
                    prevState.filter(language => language.label !== label),
                  )
                }
              >
                <TagLabel>{label}</TagLabel>
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
            value={selectedStack}
            onChange={values => setSelectedStack(values as any)}
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
            {selectedStack.map(({ label }) => (
              <Tag
                size="md"
                key={label}
                rounded="full"
                variant="solid"
                variantColor="purple"
                cursor="pointer"
                mb={2}
                onClick={() =>
                  setSelectedStack(prevState =>
                    prevState.filter(stack => stack.label !== label),
                  )
                }
              >
                <TagLabel>{label}</TagLabel>
                <TagCloseButton />
              </Tag>
            ))}
          </Stack>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Textarea
            id="description"
            name="description"
            value={description}
            minHeight={200}
            onChange={handleInputChange}
            bg="#f2f2ff"
            p={2}
            borderColor="transparent"
            _hover={{ borderColor: '#cab3ff' }}
            _focus={{ borderColor: '#805ad5' }}
            borderWidth={2}
          />
        </FormControl>
        <Button
          alignSelf={{ md: 'flex-end' }}
          variantColor="purple"
          onClick={() =>
            createCollabPost({
              variables: {
                post: {
                  ...postInput,
                  languages: selectedLanguages.map(({ label }) => label),
                  stack: selectedStack.map(({ label }) => label),
                },
              },
            })
          }
        >
          Create
        </Button>
      </Stack>
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
