import React from 'react'
import styled from 'styled-components'

type Props = {
  src: string | null
  alt: string
}

export const Avatar = ({
  src = 'https://randomuser.me/api/portraits/women/82.jpg',
  alt,
}: Props) => {
  return (
    <AvatarContainer>
      <StyledAvatar src={src!} alt={alt} />
    </AvatarContainer>
  )
}

const StyledAvatar = styled.img`
  width: 100%;
`

const AvatarContainer = styled.div`
  border-radius: 3px;
  overflow: hidden;
  height: 2.5rem;
  width: 2.5rem;
  background: #eee;
`
