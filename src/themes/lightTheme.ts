import { theme } from '@chakra-ui/core'

export const lightTheme = {
  ...theme,
  fonts: {
    body: 'Inter, sans-serif',
    heading: 'Inter, serif',
    mono: 'Inter, monospace',
  },
  colors: {
    ...theme.colors,
    bg: 'white',
    text: '#303030',
  },
}
