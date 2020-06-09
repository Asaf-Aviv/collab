import React, { useState } from 'react'
import { Button, Textarea } from '@chakra-ui/core'
import { SectionHorizonalHeader } from '../SectionHorizonalHeader/SectionHorizonalHeader'

type Props = {
  onSubmit: (content: string) => void
}

export const CommentForm = ({ onSubmit }: Props) => {
  const [content, setContent] = useState('')

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        onSubmit(content)
        setContent('')
      }}
    >
      <SectionHorizonalHeader title="Add a Comment" titleTag="h3" />
      <Textarea
        isRequired
        placeholder="Add a Comment"
        bg="#f2f2ff"
        p={2}
        _hover={{ borderColor: '#cab3ff' }}
        _focus={{ borderColor: '#805ad5' }}
        value={content}
        onChange={(e: any) => setContent(e.target.value)}
        minHeight={120}
        mb={6}
      />
      <Button
        display="block"
        ml="auto"
        type="submit"
        variantColor="purple"
        mb={6}
        boxShadow="md"
      >
        Comment
      </Button>
    </form>
  )
}
