import styled from '@emotion/styled'
import { Box, PseudoBox, PseudoBoxProps } from '@chakra-ui/core'

export const Container = styled(Box)<{ fullWidth?: boolean }>`
  margin: 0 auto;
  padding-left: 2.5%;
  padding-right: 2.5%;
  max-width: ${({ fullWidth }) => (fullWidth ? '100%' : '1200px')};
`

export const PageHeaderSpacing = styled.div`
  padding-top: 2rem;
`

export const Paper = styled(PseudoBox)<PseudoBoxProps>`
  display: flex;
  height: 100%;
  border-radius: 6px;
  box-shadow: 0px 2px 9px 0 rgb(221, 221, 221);
`

export const IconButton = styled.button`
  height: 30px;
  width: 30px;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  transition: background-color 200ms;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`
