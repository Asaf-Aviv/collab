import React from 'react'
import { Tooltip, IconButton, IconButtonProps } from '@chakra-ui/core'

type Props = Omit<IconButtonProps, 'aria-label'> & {
  ariaLabel: string
  icon: IconButtonProps['icon']
}

export const IconButtonWithTooltip = ({
  ariaLabel,
  onClick,
  icon,
  size = 'sm',
  ...props
}: Props) => {
  return (
    <Tooltip
      aria-label={ariaLabel}
      label={ariaLabel}
      placement="bottom"
      closeOnClick
      hasArrow
      p={2}
      borderRadius={4}
      fontSize="0.75rem"
      zIndex={100}
    >
      <IconButton
        size={size}
        bg="transparent"
        aria-label={ariaLabel}
        onClick={onClick}
        icon={icon}
        {...props}
      />
    </Tooltip>
  )
}
