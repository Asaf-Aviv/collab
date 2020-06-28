import React from 'react'
import { Text, Flex, Button } from '@chakra-ui/core'
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded'

type Props = {
  message: string
  onClick?: () => void
}

export const DisplayError = ({ message, onClick }: Props) => (
  <Flex direction="column" align="center" mx="auto" maxWidth={500} p={4}>
    <Flex align="center">
      <Text fontWeight={500}>{message}</Text>
    </Flex>
    {onClick && (
      <Flex mt={4}>
        <Button
          onClick={onClick}
          size="sm"
          variant="outline"
          variantColor="red"
        >
          <RefreshRoundedIcon fontSize="small" />
          <Text
            ml={1}
            display="block"
            as="span"
            letterSpacing={0}
            fontSize="0.9rem"
          >
            Try Again
          </Text>
        </Button>
      </Flex>
    )}
  </Flex>
)
