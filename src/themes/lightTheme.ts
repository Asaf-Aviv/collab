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
  shadows: {
    ...theme.shadows,
    outline: '0 0 0 2px rgb(51 0 255 / 60%)',
  },
}
