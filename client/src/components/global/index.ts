import styled from '@emotion/styled'
import { Box, Flex, FlexProps } from '@chakra-ui/core'

export const Container = styled(Box)<{ fullWidth?: boolean }>`
  margin: 0 auto;
  width: 95%;
  max-width: ${({ fullWidth }) => (fullWidth ? '95%' : '1200px')};
`

export const Paper = styled(Flex)<FlexProps>`
  height: 100%;
  border-radius: 6px;
  box-shadow: 2px 6px 15px 0 rgba(179, 163, 204, 0.38);
  overflow: 'hidden';
  background-color: ${props => props.bg || 'white'};
`
