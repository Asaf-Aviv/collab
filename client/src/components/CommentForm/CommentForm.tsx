import React from 'react'
import { Text, Divider, Heading, Button, Textarea } from '@chakra-ui/core'

type Props = {
  value: string
  onChange: (value: string) => void
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

export const CommentForm = ({ value, onChange, onSubmit }: Props) => {
  return (
    <form onSubmit={onSubmit}>
      <Text
        as="span"
        display="inline-block"
        borderBottom="2px solid #964cff"
        mb="-2px"
        position="relative"
        zIndex={2}
      >
        <Heading as="h3" mb={2} size="sm">
          Add a Comment
        </Heading>
      </Text>
      <Divider mt={0} mb={6} />
      <Textarea
        placeholder="Add a comment"
        bg="#e3dcf3"
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
