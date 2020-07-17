import React from 'react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Box,
  BoxProps,
  PopoverProps,
} from '@chakra-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { IconButtonWithTooltip } from '../IconButtonWithTooltip'

type Props = BoxProps & {
  children: React.ReactNode
  placement?: PopoverProps['placement']
  iconProps: Omit<React.ComponentProps<typeof IconButtonWithTooltip>, 'icon'>
}

export const DotsMenu = ({
  children,
  iconProps,
  placement = 'bottom',
  ...props
}: Props) => (
  <Box {...props} onClick={e => e.stopPropagation()}>
    <Popover placement={placement} closeOnBlur>
      <PopoverTrigger>
        <Box as="span">
          <IconButtonWithTooltip icon={MoreVertIcon} {...iconProps} />
        </Box>
      </PopoverTrigger>
      <PopoverContent zIndex={4} width="auto">
        <PopoverBody tabIndex={-2}>{children}</PopoverBody>
      </PopoverContent>
    </Popover>
  </Box>
)
