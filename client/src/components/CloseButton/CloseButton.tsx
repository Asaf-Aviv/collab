import React, { ButtonHTMLAttributes } from 'react'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import { IconButton } from '../global'
import { IconButtonProps } from '@chakra-ui/core'

type Props = Omit<IconButtonProps, 'aria-label'>

export const CloseButton = (props: Props) => (
  <IconButton {...props} aria-label="close">
    <CloseRoundedIcon />
  </IconButton>
)
