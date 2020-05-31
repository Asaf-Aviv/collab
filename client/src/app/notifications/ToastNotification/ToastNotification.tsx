import React from 'react'
import { Flex, Text, Box } from '@chakra-ui/core'
import { CloseButton } from '../../../components/CloseButton'

const toastProps = {
  success: {
    borderColor: '#08b61d',
    titleColor: '#077313',
    bg: '#f0fef1',
  },
  error: {
    borderColor: '#ff0d0d',
    titleColor: '#fb1a21',
    bg: '#ffebeb',
  },
  info: {
    borderColor: '#6e86ff',
    titleColor: '#305dff',
    bg: '#dfefff',
  },
  warning: {
    borderColor: '#ae9cff',
    titleColor: '#e29812',
    bg: '#fff7e2',
  },
}

export type ToastProps = typeof toastProps

export type Variant = keyof ToastProps

export type ToastNotificationProps = {
  title: string
  message: string
  variant: Variant
  dismiss: () => void
  url?: string
  type?: string
}

const getToastProps = (variant: Variant) => toastProps[variant]

export const ToastNotification = ({
  variant,
  title,
  dismiss,
  message,
}: ToastNotificationProps) => {
  const { borderColor, bg, titleColor } = getToastProps(variant)

  return (
    <Box
      p={4}
      mb={4}
      borderLeft="5px solid"
      borderColor={borderColor}
      minWidth={300}
      bg={bg}
      maxWidth={500}
      fontSize="0.85rem"
      borderRadius={3}
      overflow="hidden"
      boxShadow="0 4px 10px #e0e0e0"
    >
      <Flex justify="space-between" mb={2}>
        <Text fontWeight={600} color={titleColor}>
          {title}
        </Text>
        <CloseButton
          size="xs"
          color="#7f7f7f"
          onClick={dismiss}
          mt="-10px"
          mr="-13px"
        />
      </Flex>
      <Text textAlign="left" pr={4}>
        {message}
      </Text>
    </Box>
  )
}
