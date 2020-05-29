import React, { useCallback } from 'react'
import { useNewNotificationSubscription } from '../../../graphql/generates'
import { useCurrentUser } from '../../../providers'
import { useToast, Flex, Text, Box } from '@chakra-ui/core'
import { CloseButton } from '../../../components/CloseButton'

type Props = {
  children: React.ReactNode
}

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

type Variant = keyof typeof toastProps

type ToastNotificationProps = {
  title: string
  body: string
  variant: Variant
  dismiss: () => void
  url?: string
  type?: string
}

const getToastProps = (variant: Variant) => toastProps[variant]

const useToastNotification = () => {
  const toast = useToast()

  return useCallback(
    (
      variant: keyof typeof toastProps,
      notification: Omit<ToastNotificationProps, 'dismiss' | 'variant'>,
    ) => {
      toast({
        position: 'bottom',
        // eslint-disable-next-line react/display-name
        render: ({ onClose }: any) => (
          <ToastNotification
            dismiss={onClose}
            variant={variant}
            {...notification}
          />
        ),
      })
    },
    [toast],
  )
}

const ToastNotification = ({
  variant,
  title,
  dismiss,
  body,
}: ToastNotificationProps) => {
  const { borderColor, bg, titleColor } = getToastProps(variant)

  return (
    <Box
      p={4}
      mb={4}
      borderLeft="5px solid"
      borderColor={borderColor}
      bg={bg}
      maxWidth={400}
      fontSize="0.85rem"
      borderRadius={3}
      overflow="hidden"
      boxShadow="0 4px 10px #e0e0e0"
    >
      <Flex justify="space-between" mb={2}>
        <Text fontWeight={600} color={titleColor}>
          New Friend{title}
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
        AsafAviv accepted your friend request {body}
      </Text>
    </Box>
  )
}

export const CurrentUserNotifications = ({ children }: Props) => {
  const currentUser = useCurrentUser()
  const notify = useToastNotification()

  useNewNotificationSubscription({
    skip: !currentUser,
    onSubscriptionData({ subscriptionData }) {
      console.log(subscriptionData)
      const { newNotification } = subscriptionData.data || {}

      if (!newNotification) return

      notify('success', newNotification)

      console.log(subscriptionData.data?.newNotification)
    },
  })

  return <>{children}</>
}
