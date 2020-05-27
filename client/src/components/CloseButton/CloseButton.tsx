import React from 'react'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import { IconButton, IconButtonProps } from '@chakra-ui/core'

type Props = Omit<IconButtonProps, 'aria-label'>

export const CloseButton = (props: Props) => (
  <IconButton aria-label="Close" {...props} icon={CloseRoundedIcon} />
)
