import React, { useState, ChangeEvent } from 'react'
import styled from 'styled-components'
import { FlexColumn, H1, Container } from '../global'
import { useHistory } from 'react-router-dom'
import {
  Radio,
  RadioGroup,
  Button,
  Heading,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/core'
import {
  useCreateCollabPostMutation,
  Experience,
  CollabPostArgs,
} from '../../graphql/generates'

// fake autocomplete
const suggestions = ['JavaScript', 'TypeScript', 'React', 'GraphQL']
const fakeAutocomplete = (text: string): Promise<string[]> =>
  new Promise(res => {
    console.log('running')

    const sug = suggestions.filter(s =>
      [...text].every(c => new RegExp(`${c}`, 'i').test(s)),
    )
    console.log(sug)

    setTimeout(() => res(sug), 200)
  })

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

  const handleHasStaredChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPostInput(prevState => ({
      ...prevState,
      hasStarted: e.target.value === 'yes',
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
    <Flex direction="column" m="auto" maxW={786}>
      <Heading as="h1" size="xl" textAlign="center" mb={10}>
        Create a Collab
      </Heading>
      <FormControl>
        <FormLabel htmlFor="name" display="block">
          Collab Name
        </FormLabel>
        <Input
          id="name"
          name="name"
          value={name}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="title" display="block">
          Post Title
        </FormLabel>
        <Input
          id="title"
          name="Title"
          value={title}
          onChange={handleInputChange}
        />
      </FormControl>
      <h3>experience</h3>
      <RadioGroup
        onChange={handleHasStaredChange}
        value={hasStarted ? 'yes' : 'no'}
      >
        <Radio value="no">No</Radio>
        <Radio value="yes">Yes</Radio>
      </RadioGroup>
      <select
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
      </select>
      <h3>description</h3>
      <textarea
        rows={10}
        name="description"
        placeholder="Collab description"
        value={description}
        onChange={handleDescriptionChange}
      />
      <h3>suggestions</h3>
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
      <h3>stack</h3>
      {stack.map(s => (
        <button type="button" key={s} onClick={toggleStack(s)}>
          {s}
        </button>
      ))}
      <Button variantColor="purple" onClick={() => createCollabPost()}>
        Create
      </Button>
    </Flex>
  )
}
