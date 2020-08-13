import styled from '@emotion/styled'
import { Box, PseudoBox, PseudoBoxProps } from '@chakra-ui/core'

export const Container = styled(Box)`
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;
`

export const PageHeaderSpacing = styled.div`
  padding-top: 2rem;
`

export const Paper = styled(PseudoBox)<PseudoBoxProps>`
  background-color: ${props => (props.bg as string) || '#f2f2ff'};
  display: flex;
  border-radius: 6px;
  box-shadow: 0px 2px 4px 0 rgb(216, 216, 216);
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
