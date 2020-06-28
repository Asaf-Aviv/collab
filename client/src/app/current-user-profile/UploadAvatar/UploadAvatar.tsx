import React, { useRef } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Box, Avatar } from '@chakra-ui/core'
import { useCurrentUser } from '../../../providers'
import { getAvatarUrl } from '../../../utils'
import styled from '@emotion/styled'

const MUTATION = gql`
  mutation($avatar: Upload!) {
    uploadAvatar(avatar: $avatar) {
      id
      avatar
    }
  }
`

export const UploadAvatar = () => {
  const [mutate] = useMutation(MUTATION)
  const inputRef = useRef<HTMLInputElement>(null!)
  const currentUser = useCurrentUser()!

  function onChange({
    target: {
      validity,
      // @ts-ignore
      files: [file],
    },
  }: React.ChangeEvent<HTMLInputElement>) {
    if (validity.valid) mutate({ variables: { avatar: file } })
  }

  return (
    <Box py={4}>
      <StyledButton
        aria-label="Change profile avatar"
        onClick={() => inputRef.current.click()}
      >
        <Avatar
          src={getAvatarUrl(currentUser.avatar)}
          name={currentUser.username}
          size="lg"
        />
      </StyledButton>
      <input ref={inputRef} type="file" hidden required onChange={onChange} />
    </Box>
  )
}

const StyledButton = styled.button`
  outline: none;
  border-radius: 50%;
  margin: auto;
  display: block;

  :focus {
    box-shadow: 0 0 3px 2px #964cff;
  }
`
