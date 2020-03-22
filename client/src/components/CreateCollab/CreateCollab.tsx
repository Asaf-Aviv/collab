import React, { useState, ChangeEvent } from 'react'
import { Container } from '../global'
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
  Input,
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
} from '../../graphql/generates'
import { Option } from 'react-select/src/filters'

const experienceOptions = [
  'ALL',
  'JUNIOR',
  'JUNIOR_MID',
  'MID',
  'MID_SENIOR',
  'SENIOR',
].map(value => ({ value, label: value }))

export const CreateCollab = () => {
  const [postInput, setPostInput] = useState<
    Omit<CollabPostArgs, 'languages' | 'stack'>
  >({
    name: 'Collabbbb',
    title: 'React TypeScript next level app',
    experience: 'ALL' as Experience,
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

  const handleHasStaredChange = (value: string | number | undefined) => {
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
      <Stack spacing={6} m="auto" maxW={786}>
        <FormControl>
          <FormLabel htmlFor="name">Collab Name</FormLabel>
          <Input
            id="name"
            name="name"
            value={name}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="title">Post Title</FormLabel>
          <Input
            id="title"
            name="title"
            value={title}
            onChange={handleInputChange}
          />
        </FormControl>
        <Flex>
          <FormControl mr={10}>
            <FormLabel htmlFor="new-project" mb={2}>
              New Project?
            </FormLabel>
            <RadioButtonGroup
              spacing={4}
              isInline
              id="new-project"
              onChange={handleHasStaredChange}
              value={hasStarted ? 'no' : 'yes'}
            >
              <Radio value="no">No</Radio>
              <Radio value="yes">Yes</Radio>
            </RadioButtonGroup>
          </FormControl>
          <FormControl width={200}>
            <FormLabel htmlFor="experience">Experience</FormLabel>
            <ReactSelect
              defaultValue={experienceOptions[0]}
              id="experience"
              placeholder=""
              name="experience"
              options={experienceOptions}
              onChange={handleExperienceChange as any}
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
            {selectedLanguages.map(({ label }) => (
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
                    prevState.filter(language => language.label !== label)
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
                    prevState.filter(stack => stack.label !== label)
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
          />
        </FormControl>
        <Button
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
