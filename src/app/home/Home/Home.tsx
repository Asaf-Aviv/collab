import React from 'react'
import { Heading, Box, Stack, Flex, Button, Text } from '@chakra-ui/core'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { ReactComponent as TaskBoardSvg } from '../../../assets/illustrations/undraw_scrum_board_cesn.svg'
import { ReactComponent as CoWorkers } from '../../../assets/illustrations/undraw_co-workers_ujs6.svg'
import { ReactComponent as CollabSvg4 } from '../../../assets/illustrations/undraw_having_fun_iais.svg'
import { ReactComponent as CollabSvg5 } from '../../../assets/illustrations/undraw_hang_out_h9ud.svg'
import { ReactComponent as FeedbackSvg } from '../../../assets/illustrations/feedback.svg'
import { Container } from '../../../components/global'
import { SEO } from '../../../components/SEO'

export const Home = () => {
  return (
    <>
      <SEO title="Home" url={window.location.href} />
      <Container bg="#582398" width="100%" pt={4}>
        <Flex direction="column" position="relative">
          <Stack spacing={3} align="center" my={10}>
            <Heading
              as="h1"
              size="2xl"
              color="#f8e5ff"
              fontWeight={500}
              letterSpacing={3}
            >
              Collab
            </Heading>
            <Heading
              maxWidth="40ch"
              flexShrink={0}
              textAlign="center"
              color="#fbdcffcc"
              lineHeight={1.5}
              as="h2"
              size="lg"
              fontWeight={400}
            >
              Collaborate with other developers from all over the world and
              build awesome Apps together!
            </Heading>
          </Stack>
          <Box w={['100%', '100%', '60%']} m="0 auto">
            <CoWorkers style={{ maxWidth: '100%' }} />
          </Box>
        </Flex>
      </Container>
      <Box>
        <Container>
          <FeatureSection
            title="Task Board"
            text="Track your team's tasks on the task board!"
            svg={TaskBoardSvg}
          />
        </Container>
        <Container bg="#582398">
          <FeatureSection
            title="Make Friends"
            text="Make new friends from all around the world!"
            svg={CollabSvg5}
            textColor="white"
          />
        </Container>
        <Container>
          <FeatureSection
            title="Feedback"
            text="Get feedback from the community"
            svg={FeedbackSvg}
          />
        </Container>
        <Container bg="#582398">
          <FeatureSection
            title="Showcase"
            text="Launch your app and show the community what you have built together!"
            svg={CollabSvg4}
            textColor="white"
          />
        </Container>
        <Container>
          <Flex
            direction={['column', 'column', 'row']}
            align={['center']}
            justify={'flex-start'}
            py={[12, 12, 20]}
            maxWidth={900}
            mx="auto"
          >
            <Text
              fontWeight={600}
              fontSize={['xl', '2xl', '3xl']}
              mb={[6, 6, 0]}
              mr={[0, 0, 16]}
              color="#735b80"
            >
              Let&apos;s make some apps together!
            </Text>
            <Button
              as={Link}
              //@ts-ignore
              to="/signup"
              variantColor="purple"
              size="lg"
              boxShadow="xl"
              _focus={{ boxShadow: 'xl' }}
            >
              Get Started
            </Button>
          </Flex>
        </Container>
      </Box>
    </>
  )
}

type FeatureSectionProps = {
  text: string
  svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  title?: string
  textColor?: string
}

const FeatureSection = ({
  svg: SvgComponent,
  title,
  text,
  textColor,
}: FeatureSectionProps) => (
  <Box maxWidth={900} m="0 auto" h={['auto', 'auto', 400]}>
    <StyledFlex
      py={8}
      direction={['column', 'column', 'row']}
      align={['center', 'center']}
      height="100%"
    >
      <Stack
        spacing={[2, 4]}
        mb={[4, 6]}
        flex={[1, 1, 2]}
        textAlign={['center', 'center', 'left']}
        color={textColor}
      >
        {title && (
          <Heading as="h3" size="lg" letterSpacing="1px">
            {title}
          </Heading>
        )}
        <Text maxWidth={400} fontSize={['md', 'lg', 'xl']}>
          {text}
        </Text>
      </Stack>
      <SvgComponent />
    </StyledFlex>
  </Box>
)

const StyledFlex = styled(Flex)`
  align-items: center;
  flex-direction: column;
  > svg {
    flex: 1;
  }
`
