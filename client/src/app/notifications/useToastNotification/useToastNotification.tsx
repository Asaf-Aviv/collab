import React, { useCallback } from 'react'
import { useToast } from '@chakra-ui/core'
import {
  ToastNotification,
  Variant,
  ToastNotificationProps,
} from '../ToastNotification'

export const useToastNotification = () => {
  const toast = useToast()

  return useCallback(
    (
      variant: Variant,
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
