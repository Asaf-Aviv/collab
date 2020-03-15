import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FlexColumn, H1 } from '../global'
import { useHistory } from 'react-router-dom'
import { Radio, RadioGroup } from '@chakra-ui/core'
import {
  useCreateCollabPostMutation,
  Experience,
} from '../../graphql/generates'

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
  const [name, setName] = useState('Collabbbb')
  const [title, setTitle] = useState('React TypeScript next level app')
  const [experience, setExperience] = useState<Experience>('ALL' as Experience)
  const [stack, setStack] = useState<string[]>(['TypeScript', 'React'])
  const [description, setDescription] = useState('Our first Collab!')
  const [stackInput, setstackInput] = useState('')
  const [hasStarted, setHasStarted] = useState('no')
  const [sugg, setSuggs] = useState<string[]>([])
  const history = useHistory()
  const [createCollabPost] = useCreateCollabPostMutation({
    variables: {
      post: {
        name,
        title,
        stack,
        experience,
        description,
        hasStarted: hasStarted === 'yes',
      },
    },
    onCompleted: ({ createCollabPost }) => {
      history.push(`/collab/${createCollabPost.id}`)
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
    <div>
      <FlexColumn>
        <H1>Create a Collab</H1>
        <h3>name</h3>
        <Input
          type="text"
          value={name}
          placeholder="Name"
          onChange={e => setName(e.target.value)}
        />
        <h3>Title</h3>
        <Input
          type="text"
          value={title}
          placeholder="Title"
          onChange={e => setTitle(e.target.value)}
        />
        <h3>experience</h3>
        <RadioGroup
          onChange={e => setHasStarted(e.target.value)}
          value={hasStarted}
        >
          <Radio value="no">No</Radio>
          <Radio value="yes">Yes</Radio>
        </RadioGroup>
        <select
          value={experience}
          onChange={e => setExperience(e.target.value as Experience)}
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
          placeholder="Collab description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <h3>suggestions</h3>
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
        <Button onClick={() => createCollabPost()}>Create</Button>
      </FlexColumn>
    </div>
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
