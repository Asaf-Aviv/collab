import React from 'react'
import { ReactComponent as CollabSvg } from '../../assets/illustrations/undraw_real_time_collaboration_c62i.svg'
import { ReactComponent as TaskBoardSvg } from '../../assets/illustrations/undraw_scrum_board_cesn.svg'
// import { ReactComponent as CollabSvg2 } from '../../assets/illustrations/undraw_team_page_pgpr.svg'
import { ReactComponent as WorkTogether } from '../../assets/illustrations/undraw_work_together_h63l.svg'
import { ReactComponent as CoWorkers } from '../../assets/illustrations/undraw_co-workers_ujs6.svg'
import { ReactComponent as CollabSvg4 } from '../../assets/illustrations/undraw_having_fun_iais.svg'
import { ReactComponent as CollabSvg5 } from '../../assets/illustrations/undraw_hang_out_h9ud.svg'
import { ReactComponent as CollabSvg6 } from '../../assets/illustrations/undraw_connected_world_wuay.svg'
import { ReactComponent as CircleSvg } from '../../assets/svgs/untitled.svg'
import { Container, PageHeaderSpacing } from '../global'
import RadioButtonUncheckedOutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined'
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory'
import { Heading, Box, Stack, Flex, Button, Text } from '@chakra-ui/core'
import styled from '@emotion/styled'

export const Home = () => {
  return (
    <>
      <Container bg="#582398">
        <PageHeaderSpacing />
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
          <Stack spacing={3} align="center" mb={10}>
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
          <CoWorkers style={{ maxWidth: '100%' }} />
        </Flex>
      </Container>
      <Container bg="#ecddff">
        <FeatureSection
          title="Task Board"
          text="Track your team's tasks on the task board!"
          svg={TaskBoardSvg}
        />
      </Container>
      <Container>
        <FeatureSection
          title="Collab"
          text="Connect with other engineers and build awesome apps together!"
          svg={CollabSvg}
        />
        <FeatureSection
          title="Make Friends"
          text="Meet new friends from around the world!"
          svg={CollabSvg5}
        />
        <FeatureSection
          title="Showcase"
          text="Launch your app and show the world what you have built together!"
          svg={CollabSvg4}
        />
        <Flex position="relative">
          <RadioButtonUncheckedOutlinedIcon />
          <ChangeHistoryIcon />
          <Text as="span">Let's make some apps together!</Text>
          <Button color="purple" size="lg">
            Get Started
          </Button>
        </Flex>
      </Container>
    </>
  )
}

type Props = {
  title?: string
  text: string
  svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}

const FeatureSection = ({ svg: SvgComponent, title, text }: Props) => (
  <StyledSection>
    <StyledFlex py={4}>
      <Stack spacing={3} flex={1}>
        {title && (
          <Heading as="h3" size="lg">
            {title}
          </Heading>
        )}
        <Text>{text}</Text>
      </Stack>
      <SvgComponent />
    </StyledFlex>
  </StyledSection>
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

const StyledSection = styled(Box)`
  /* background: #fff;
  box-shadow: 2px 6px 15px 0 rgba(219, 195, 255, 0.38);
  padding: 2.5rem;
  border-top: 5px solid #964cff;
  border-radius: 6px;
  &:not(:first-of-type) {
    margin-top: 2.5rem;
  } */
`

const StyledFlex = styled(Flex)`
  align-items: center;
  flex-direction: column;
  > svg {
    /* height: 100%; */
    /* width: 30%; */
  }
`
