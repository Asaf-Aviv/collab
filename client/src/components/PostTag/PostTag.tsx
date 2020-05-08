import React from 'react'
import { Tag, TagProps } from '@chakra-ui/core'
import styled from '@emotion/styled'

export const PostTag = ({ variantColor = 'purple', ...props }: TagProps) => (
  <StyledTag
    variantColor={variantColor}
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
