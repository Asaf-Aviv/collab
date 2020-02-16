import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import styled from 'styled-components'

const CREATE_COLLAB = gql`
  mutation CreateCollab($collab: CollabArgs!) {
    createCollab(collab: $collab) {
      id
      ownerId
      owner {
        id
        username
        email
      }
      experience
      stack
      description
    }
  }
`

// fake autocomplete
const suggestions = ['JavaScript', 'TypeScript', 'React', 'GraphQL']
const fakeAutocomplete = (text: string): Promise<string[]> =>
  new Promise(res => {
    console.log('running')

    const sug = suggestions.filter(s =>
      [...text].every(c => new RegExp(`${c}`, 'i').test(s))
    )
    console.log(sug)

    setTimeout(() => res(sug), 200)
  })

export const CreateCollab = () => {
  const [experience, setExperience] = useState('')
  const [title, setTitle] = useState('')
  const [stack, setStack] = useState<string[]>([])
  const [stackInput, setstackInput] = useState('')
  const [sugg, setSuggs] = useState<string[]>([])
  const [description, setDescription] = useState('')
  const [createCollab] = useMutation(CREATE_COLLAB, {
    variables: {
      collab: {
        stack: ['TypeScript', 'React', 'Redux'],
        experience: 'JUNIOR',
        description: 'Our Awesome App',
      },
    },
  })

  const toggleStack = (name: string) => () => {
    const inStack = stack.includes(name)
    console.log(inStack)
    setStack(prevState =>
      inStack ? prevState.filter(s => s !== name) : [...prevState, name]
    )
  }

  useEffect(() => {
    fakeAutocomplete(stackInput).then(setSuggs)
  }, [stackInput])

  return (
    <Container>
      <h3>Title</h3>
      <Input
        type="text"
        value={title}
        placeholder="Title"
        onChange={e => setTitle(e.target.value)}
      />
      <h3>experience</h3>
      <select value={experience} onChange={e => setExperience(e.target.value)}>
        <option selected disabled hidden>
          Experience
        </option>
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
        placeholder="Collab description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <h3>suggerstions</h3>
      <input
        placeholder="Stack"
        type="text"
        value={stackInput}
        onChange={e => setstackInput(e.target.value)}
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
      <Button onClick={() => createCollab()}>Create</Button>
    </Container>
  )
}
const Button = styled.button.attrs({
  type: 'button',
})`
  cursor: pointer;
  font-family: inherit;
  padding: 0.75rem 1.5rem;
  border: none;
  text-transform: uppercase;
  border-radius: 6px;
  color: white;
  background: #2884b0;
  transition: background 200ms;
  &:hover {
    background: #216f95;
  }
  &:active {
    background: #17516c;
  }
`

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #c2c2c2;
`

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`
