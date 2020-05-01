import React from 'react'
import { Text, Flex, Button } from '@chakra-ui/core'
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded'

type Props = {
  message: string
  onClick?: () => void
}

export const DisplayError = ({ message, onClick }: Props) => (
  <Flex direction="column" align="center" mx="auto" maxWidth={500}>
    <Flex align="center">
      <Text ml={2} fontWeight={500}>
        {message}
      </Text>
    </Flex>
    {onClick && (
      <Flex mt={4}>
        <Button
          onClick={onClick}
          variant="outline"
          variantColor="red"
          // color="white"
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
