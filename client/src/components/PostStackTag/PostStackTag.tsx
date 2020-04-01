import React from 'react'
import { Tag, TagProps } from '@chakra-ui/core'
import { Link } from 'react-router-dom'

type Props = TagProps & {
  children: string
}

export const PostStackTag = (props: Props) => {
  return (
    <Tag
      as={Link}
      //@ts-ignore
      to={`/collabs/posts/stack/${props.children}`}
      boxShadow="md"
      size="md"
      variantColor="purple"
      {...props}
    />
  )
}
