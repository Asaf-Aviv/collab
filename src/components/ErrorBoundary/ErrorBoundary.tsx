import React from 'react'
import * as Sentry from '@sentry/react'
import { Box, Text, Button } from '@chakra-ui/core'

export const ErrorBoundary = ({
  text,
  children,
}: {
  text: string
  children: React.ReactNode
}) => (
  <Sentry.ErrorBoundary
    fallback={({ resetError }) => (
      <Box py={4} mx="auto">
        <Text fontWeight={600}>{text}</Text>
        <Button variantColor="purple" onClick={resetError}>
          Refresh
        </Button>
      </Box>
    )}
  >
    {children}
  </Sentry.ErrorBoundary>
)
