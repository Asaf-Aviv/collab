import React from 'react'
import { FormControl, FormLabel, Input, InputProps } from '@chakra-ui/core'

type Props = InputProps<HTMLInputElement> & {
  label: string
  htmlFor: string
}

export const InputWithLabel = ({ label, htmlFor, ...props }: Props) => (
  <FormControl>
    <FormLabel htmlFor={htmlFor}>{label}</FormLabel>
    <Input
      size="lg"
      bg="#f2f2ff"
      borderColor="transparent"
      _hover={{ borderColor: '#cab3ff' }}
      _focus={{ borderColor: '#805ad5' }}
      borderWidth={2}
      {...props}
    />
  </FormControl>
)
