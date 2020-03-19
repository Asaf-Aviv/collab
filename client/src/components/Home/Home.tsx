import React from 'react'
import { ReactComponent as CollabSvg } from '../../assets/illustrations/undraw_real_time_collaboration_c62i.svg'
import { ReactComponent as CollabSvg1 } from '../../assets/illustrations/undraw_scrum_board_cesn.svg'
// import { ReactComponent as CollabSvg2 } from '../../assets/illustrations/undraw_team_page_pgpr.svg'
// import { ReactComponent as CollabSvg3 } from '../../assets/illustrations/undraw_work_together_h63l.svg'
import { ReactComponent as CollabSvg4 } from '../../assets/illustrations/undraw_having_fun_iais.svg'
import { ReactComponent as CollabSvg5 } from '../../assets/illustrations/undraw_hang_out_h9ud.svg'
import { ReactComponent as CollabSvg6 } from '../../assets/illustrations/undraw_connected_world_wuay.svg'
import { Container } from '../global'
import { Heading, Box, Stack, Flex } from '@chakra-ui/core'
import styled from '@emotion/styled'

type Props = {
  title?: string
  text: string
  svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}

const FeatureSection = ({ svg: SvgComponent, title, text }: Props) => (
  <StyledSection>
    <Box>
      <StyledFlex>
        <Stack spacing={3} flex={1}>
          {title && (
            <Heading as="h3" size="xl">
              {title}
            </Heading>
          )}
          <Heading as="h3" size="lg" fontWeight={500}>
            {text}
          </Heading>
        </Stack>
        <SvgComponent />
      </StyledFlex>
    </Box>
  </StyledSection>
)

export const Home = () => {
  return (
    <Container>
      <StyledFlex>
        <Stack spacing={3}>
          <Heading as="h1" size="2xl">
            Collab
          </Heading>
          <Heading as="h2" size="lg" fontWeight={500}>
            Connect with other developers and build awesome apps together!
          </Heading>
        </Stack>
        <CollabSvg6 />
      </StyledFlex>
      <FeatureSection
        title="Collab"
        text="Connect with other engineers and build awesome apps together!"
        svg={CollabSvg}
      />
      <FeatureSection
        title="Task Board"
        text="Track your team's tasks on the task board!"
        svg={CollabSvg1}
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
      {/* <CollabSvg2 />
      <CollabSvg3 /> */}
    </Container>
  )
}

const StyledSection = styled(Box)`
  background: #fff;
  box-shadow: 2px 6px 15px 0 rgba(219, 195, 255, 0.38);
  padding: 2.5rem;
  border-top: 5px solid #964cff;
  border-radius: 6px;
  &:not(:first-of-type) {
    margin-top: 2.5rem;
  }
`

const StyledFlex = styled(Flex)`
  align-items: center;
  & > svg {
    height: 100%;
    width: 30%;
    margin-left: 2rem;
  }
`
