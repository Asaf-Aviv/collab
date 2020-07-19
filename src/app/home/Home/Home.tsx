import React from 'react'
import { ReactComponent as TaskBoardSvg } from '../../../assets/illustrations/undraw_scrum_board_cesn.svg'
import { ReactComponent as CoWorkers } from '../../../assets/illustrations/undraw_co-workers_ujs6.svg'
import { ReactComponent as CollabSvg4 } from '../../../assets/illustrations/undraw_having_fun_iais.svg'
import { ReactComponent as CollabSvg5 } from '../../../assets/illustrations/undraw_hang_out_h9ud.svg'
import { ReactComponent as FeedbackSvg } from '../../../assets/illustrations/feedback.svg'
import { Container } from '../../../components/global'
import { Heading, Box, Stack, Flex, Button, Text } from '@chakra-ui/core'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { SEO } from '../../../components/SEO'

export const Home = () => {
  return (
    <>
      <SEO title="Home" url={window.location.href} />
      <Container bg="#582398" width="100%" pt={4}>
        <Flex direction="column" position="relative">
          <Circle bg="#42d29f" border="#42d29f" top="-10px" left="15px" />
          <Circle border="#E91E63" top="80px" left="25px" />
          <Circle bg="#9a07ff" left="40px" top="155px" />
          <Circle bg="#fcbe40" left="150px" top="30px" />
          <Circle border="#9a07ff" right="10px" top="25px" />
          <Circle bg="#fcbe40" right="150px" top="5px" />
          <Circle bg="#E91E63" right="50px" top="125px" />
          <StyledTriangle top="42px" bg="#ffbe40" />
          <StyledTriangle top="80px" right="30px" bg="#9a07ff" />
          <StyledTriangle top="42px" bg="#ffbe40" />
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
              Connect with other developers from all over the world and build
              awesome Apps together!
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
            >
              Get Started
            </Button>
          </Flex>
        </Container>
      </Box>
    </>
  )
}

type Props = {
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
}: Props) => (
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

const StyledTriangle = styled.svg<{ [k: string]: any }>`
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  height: 25px;
  width: 25px;
  position: absolute;
  top: ${props => props.top};
  bottom: ${props => props.bottom};
  left: ${props => props.left};
  right: ${props => props.right};
  background-color: ${props => props.bg ?? 'transparent'};
  border: 3px solid ${props => props.border ?? props.bg};
`

const Circle = styled.div<{ [k: string]: any }>`
  clip-path: circle(48% at 50% 50%);
  height: 25px;
  width: 25px;
  position: absolute;
  top: ${props => props.top};
  bottom: ${props => props.bottom};
  left: ${props => props.left};
  right: ${props => props.right};
  background-color: ${props => props.bg ?? 'transparent'};
  border: 3px solid ${props => props.border ?? props.bg};
  border-radius: 50%;
`

const StyledFlex = styled(Flex)`
  align-items: center;
  flex-direction: column;
  > svg {
    flex: 1;
  }
`
