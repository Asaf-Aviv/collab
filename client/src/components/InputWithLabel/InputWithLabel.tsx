import React from 'react'
import {
  FormControl,
  FormControlProps,
  FormLabel,
  Input,
  InputProps,
} from '@chakra-ui/core'

type Props = InputProps<HTMLInputElement> & {
  label: string
  htmlFor: string
  containerProps?: FormControlProps
}

export const InputWithLabel = ({
  label,
  htmlFor,
  containerProps = {},
  ...props
}: Props) => (
  <FormControl {...containerProps}>
    <FormLabel htmlFor={htmlFor}>{label}</FormLabel>
    <Input
      size="lg"
      bg="#f2f2ff"
      borderColor="transparent"
      _hover={{ borderColor: '#cab3ff' }}
      _focus={{ borderColor: '#805ad5' }}
      borderWidth={2}
      id={htmlFor}
      {...props}
    />
  </FormControl>
)
