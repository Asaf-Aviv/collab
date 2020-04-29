import React, { ButtonHTMLAttributes } from 'react'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import { IconButton } from '../global'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export const CloseButton = (props: Props) => (
  <IconButton {...props}>
    <CloseRoundedIcon />
  </IconButton>
)
