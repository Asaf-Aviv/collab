import React from 'react'
import { Button, Textarea } from '@chakra-ui/core'
import { SectionHorizonalHeader } from '../SectionHorizonalHeader/SectionHorizonalHeader'

type Props = {
  value: string
  onChange: (value: string) => void
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

export const CommentForm = ({ value, onChange, onSubmit }: Props) => {
  return (
    <form onSubmit={onSubmit}>
      <SectionHorizonalHeader title="Add a Comment" titleTag="h3" />
      <Textarea
        placeholder="Add a Comment"
        bg="#f2f2ff"
        p={2}
        _hover={{ borderColor: '#cab3ff' }}
        _focus={{ borderColor: '#805ad5' }}
        value={value}
        onChange={(e: any) => onChange(e.target.value)}
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
