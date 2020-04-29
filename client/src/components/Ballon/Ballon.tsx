import React, { useRef } from 'react'
import {
  Popover,
  Flex,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  Heading,
  PopoverBody,
  useDisclosure,
  Box,
} from '@chakra-ui/core'
import styled from '@emotion/styled'
import FocusLock from 'react-focus-lock'
import { useOnOutsideClick } from '../../hooks/useOnOutsideClick'
import { Loader } from '../Loader'
import { CloseButton } from '../CloseButton/CloseButton'
import { IconButton } from '../global'

type Props = {
  triggerIcon: JSX.Element
  header: string
  children: React.ReactNode
  rightHeaderSlot?: JSX.Element
  leftHeaderSlot?: JSX.Element
  isLoading?: boolean
  onTriggerClick?: (...args: any) => void
}

export const Ballon = ({
  triggerIcon,
  header,
  leftHeaderSlot,
  rightHeaderSlot,
  children,
  isLoading,
  onTriggerClick,
}: Props) => {
  const { isOpen, onClose, onToggle } = useDisclosure()
  const popoverRef = useRef<HTMLDivElement>(null!)

  useOnOutsideClick(popoverRef, () => {
    if (isOpen) {
      onClose()
    }
  })

  return (
    <Popover placement="bottom-end" isOpen={isOpen}>
      <Box ref={popoverRef}>
        <Flex height="100%" align="center">
          <PopoverTrigger>
            <IconButton
              onClick={() => {
                onToggle()
                onTriggerClick?.()
              }}
            >
              {triggerIcon}
            </IconButton>
          </PopoverTrigger>
        </Flex>
        <PopoverContent zIndex={4}>
          <FocusLock>
            <PopoverHeader
              px={[2]}
              py={[3]}
              display="flex"
              alignItems="center"
              minHeight={50}
            >
              <StyledFlex>{leftHeaderSlot}</StyledFlex>
              <Heading
                flexShrink={0}
                as="h5"
                fontWeight={500}
                fontSize="sm"
                textAlign="center"
                flex={1}
                flexBasis="auto"
              >
                {header}
              </Heading>
              <StyledFlex justify="flex-end">
                {rightHeaderSlot}
                <CloseButton onClick={onClose} />
              </StyledFlex>
            </PopoverHeader>
            <PopoverBody p={0}>
              {children}
              {isLoading && <Loader />}
            </PopoverBody>
          </FocusLock>
        </PopoverContent>
      </Box>
    </Popover>
  )
}

const StyledFlex = styled(Flex)`
  flex: 1;
  ${IconButton} {
    + ${IconButton} {
      margin-left: 0.5rem;
    }
  }
`
