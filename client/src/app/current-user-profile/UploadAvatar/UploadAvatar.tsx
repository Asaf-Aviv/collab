import React, { useState, useRef, useEffect, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const MUTATION = gql`
  mutation($avatar: Upload!) {
    uploadAvatar(avatar: $avatar)
  }
`

export const UploadAvatar = () => {
  const [mutate] = useMutation(MUTATION)

  function onChange({
    target: { validity, files },
  }: React.ChangeEvent<HTMLInputElement>) {
    console.log(files![0])
    if (validity.valid) mutate({ variables: { avatar: files![0] } })
  }

  return <input type="file" required onChange={onChange} />
}
