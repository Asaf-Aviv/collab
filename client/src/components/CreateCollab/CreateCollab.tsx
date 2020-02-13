import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { LOGIN } from '../../App'

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
      [...text].every(c => new RegExp(`${c}`, 'i').test(s)),
    )
    console.log(sug)

    setTimeout(() => res(sug), 200)
  })

const CreateCollab: React.FC = () => {
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
      inStack ? prevState.filter(s => s !== name) : [...prevState, name],
    )
  }

  useEffect(() => {
    fakeAutocomplete(stackInput).then(setSuggs)
  }, [stackInput])

  return (
    <div>
      <button type="button" onClick={() => createCollab()}>
        Create
      </button>
      <h3>Title</h3>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      <h3>experience</h3>
      <select value={experience} onChange={e => setExperience(e.target.value)}>
        <option value="" selected disabled hidden>
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
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <h3>suggerstions</h3>
      <input
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
    </div>
  )
}

export default CreateCollab
