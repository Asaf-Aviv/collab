import React from 'react'
import { Tag, TagProps } from '@chakra-ui/core'

export const PostTag = ({ variantColor = 'purple', ...props }: TagProps) => (
  <Tag variantColor={variantColor} size="sm" boxShadow="sm" {...props} />
)
