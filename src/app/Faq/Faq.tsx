import React from 'react'
import { Heading, Box, Text, Stack } from '@chakra-ui/core'
import { Container } from '../../components/global'
import { SEO } from '../../components/SEO'

export const Faq = () => {
  return (
    <>
      <SEO
        url={window.location.href}
        title="Faq"
        description="Frequently asked questions"
      />
      <Container maxWidth={900}>
        <header>
          <Heading as="h1" textAlign="center" mb={8}>
            Faq
          </Heading>
        </header>
        <main>
          <Stack spacing={8}>
            <Box>
              <Heading as="h3" size="md" mb={2}>
                Do I have to create Apps?
              </Heading>
              <Text>
                No, You can create any collab you want. if you want to read the
                docs of a language/technology together, learn a
                framework/library or just do coding exercises together,
                it&apos;s all up to you.
              </Text>
            </Box>

            <Box>
              <Heading as="h3" size="md" mb={2}>
                I found a bug / I would like to make a suggestion?
              </Heading>
              <Text>
                Feel free to open an issue on github{' '}
                <a
                  style={{ color: '#8048ff' }}
                  href="https://github.com/Asaf-Aviv/lets-collab/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub{' '}
                </a>
                or report it on our{' '}
                <a
                  style={{ color: '#8048ff' }}
                  href="https://discord.gg/sy3rFhx"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discord{' '}
                </a>
              </Text>
            </Box>

            <Box>
              <Heading as="h3" size="md" mb={2}>
                I want to contribute, where do i start?
              </Heading>
              <Text>
                <a
                  style={{ color: '#8048ff' }}
                  href="https://github.com/Asaf-Aviv/lets-collab/blob/master/README.md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Right here
                </a>
              </Text>
            </Box>
          </Stack>
        </main>
      </Container>
    </>
  )
}
