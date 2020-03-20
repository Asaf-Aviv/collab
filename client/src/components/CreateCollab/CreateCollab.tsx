import React, { useState, ChangeEvent } from 'react'
import { Container } from '../global'
import { useHistory } from 'react-router-dom'
import {
  Radio,
  RadioGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  RadioButtonGroup,
  Textarea,
  Stack,
} from '@chakra-ui/core'
import {
  useCreateCollabPostMutation,
  Experience,
  CollabPostArgs,
} from '../../graphql/generates'
import styled from '@emotion/styled'

// fake autocomplete
const suggestions = ['JavaScript', 'TypeScript', 'React', 'GraphQL']

export const CreateCollab = () => {
  const [postInput, setPostInput] = useState<CollabPostArgs>({
    name: 'Collabbbb',
    title: 'React TypeScript next level app',
    experience: 'ALL' as Experience,
    stack: ['TypeScript', 'React'],
    description: 'Our first Collab!',
    hasStarted: false,
  })
  const [stackInput, setStackInput] = useState('')
  const [sugg, setSuggs] = useState<string[]>([])
  const history = useHistory()
  const [createCollabPost] = useCreateCollabPostMutation({
    variables: {
      post: postInput,
    },
    onCompleted: ({ createCollabPost }) => {
      history.push(`/collab/${createCollabPost.id}`)
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

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPostInput(prevState => ({
      ...prevState,
      description: e.target.value,
    }))
  }

  const handleExperienceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPostInput(prevState => ({
      ...prevState,
      experience: e.target.value as Experience,
    }))
  }

  const toggleStack = (name: string) => () => {
    const inStack = postInput.stack.includes(name)

    setPostInput(prevState => ({
      ...prevState,
      stack: inStack
        ? prevState.stack.filter(s => s !== name)
        : [...prevState.stack, name],
    }))
  }

  const { name, title, experience, stack, description, hasStarted } = postInput

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
            name="Title"
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

          <FormControl>
            <FormLabel htmlFor="experience">Experience</FormLabel>
            <Select
              id="experience"
              name="experience"
              value={experience}
              onChange={handleExperienceChange}
            >
              <option value="ALL">ALL</option>
              <option value="JUNIOR">JUNIOR</option>
              <option value="JUNIOR_MID">JUNIOR_MID</option>
              <option value="MID">MID</option>
              <option value="MID_SENIOR">MID_SENIOR</option>
              <option value="SENIOR">SENIOR</option>
            </Select>
          </FormControl>
        </Flex>
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
        <input
          name="stack"
          placeholder="Stack"
          value={stackInput}
          onChange={e => setStackInput(e.target.value)}
        />
        {sugg.map(s => (
          <span key={s} onClick={toggleStack(s)}>
            {s}
          </span>
        ))}
        {stack.map(s => (
          <button type="button" key={s} onClick={toggleStack(s)}>
            {s}
          </button>
        ))}
        <Button variantColor="purple" onClick={() => createCollabPost()}>
          Create
        </Button>
      </Stack>
    </Container>
  )
}
