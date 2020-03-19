import styled from 'styled-components'
import { Box } from '@chakra-ui/core'

export const FlexRow = styled.div`
  display: flex;
`

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`

export const H1 = styled.h1`
  margin: 2rem 0;
  text-align: center;
`

export const Container = styled(Box)<{ fullWidth?: boolean }>`
  margin: 0 auto;
  width: 95%;
  max-width: ${({ fullWidth }) => (fullWidth ? '95%' : '1200px')};
`
