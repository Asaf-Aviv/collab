import styled from '@emotion/styled'
import { Box, PseudoBox, PseudoBoxProps } from '@chakra-ui/core'

export const Container = styled(Box)`
  margin: 0 auto;
  padding-left: 2.5%;
  padding-right: 2.5%;
  /* max-width: '1200px'; */
`

export const PageHeaderSpacing = styled.div`
  padding-top: 2rem;
`

export const Paper = styled(PseudoBox)<PseudoBoxProps>`
  display: flex;
  border-radius: 6px;
  box-shadow: 0px 2px 4px 0 rgb(216, 216, 216);
  background-color: #f2f2ff;
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
