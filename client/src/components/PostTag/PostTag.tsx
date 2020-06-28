import React from 'react'
import { Tag, TagProps } from '@chakra-ui/core'
import styled from '@emotion/styled'

export const PostTag = ({ ...props }: TagProps) => (
  <StyledTag
    bg="#942bd7"
    color="white"
    size="sm"
    boxShadow="sm"
    whiteSpace="nowrap"
    {...props}
  />
)

const StyledTag = styled(Tag)`
  &:not(:last-of-type) {
    margin-right: 0.5rem;
  }
`
