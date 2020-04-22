import styled from '@emotion/styled'
import { Box, Flex, FlexProps } from '@chakra-ui/core'

export const Container = styled(Box)<{ fullWidth?: boolean }>`
  margin: 0 auto;
  padding: 0 2.5%;
  max-width: ${({ fullWidth }) => (fullWidth ? '100%' : '1200px')};
`

export const PageHeaderSpacing = styled.div`
  padding-top: 2rem;
`

export const Paper = styled(Flex)<FlexProps>`
  height: 100%;
  border-radius: 6px;
  box-shadow: 2px 6px 15px 0 rgba(179, 163, 204, 0.38);
  background-color: ${props => props.bg || 'white'};
`
