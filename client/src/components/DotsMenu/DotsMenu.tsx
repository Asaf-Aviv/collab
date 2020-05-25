import React from 'react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Box,
  BoxProps,
} from '@chakra-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { IconButtonWithTooltip } from '../IconButtonWithTooltip'

type Props = BoxProps & {
  children: React.ReactNode
  ariaLabel: string
}

export const DotsMenu = ({ children, ariaLabel, ...props }: Props) => (
  <Box {...props} onClick={e => e.stopPropagation()}>
    <Popover placement="bottom" closeOnBlur>
      <PopoverTrigger>
        <Box as="span">
          <IconButtonWithTooltip ariaLabel={ariaLabel} icon={MoreVertIcon} />
        </Box>
      </PopoverTrigger>
      <PopoverContent zIndex={4} width="auto">
        <PopoverBody tabIndex={-2}>{children}</PopoverBody>
      </PopoverContent>
    </Popover>
  </Box>
)
