import React, { useState, useEffect } from 'react'
import {
  Switch,
  Route,
  useRouteMatch,
  NavLink,
  Redirect,
} from 'react-router-dom'
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
} from '@chakra-ui/core'
import styled from '@emotion/styled'
import { Container, Paper } from '../global'
import Select from 'react-select'
import { countryOptions } from '../../data/countryOptions'
import {
  useUpdateUserInfoMutation,
  UpdateUserInfoInput,
  useGetCurrentUserInfoQuery,
  useGetCurrentUserCollabsQuery,
  useGetCurrentUserTasksQuery,
  useGetCurrentUserCollabRequestsQuery,
  useGetCurrentUserCollabInvitationsQuery,
} from '../../graphql/generates'

export const MyProfile = () => {
  const { path } = useRouteMatch()

  return (
    <Container>
      <Flex>
        <Paper
          direction="column"
          bg="white"
          minWidth={200}
          mr={10}
          overflow="hidden"
        >
          <StyledNavLink exact to={`${path}/info`}>
            Info
          </StyledNavLink>
          <StyledNavLink exact to={`${path}/collabs`}>
            Collabs
          </StyledNavLink>
          <StyledNavLink exact to={`${path}/tasks`}>
            Tasks
          </StyledNavLink>
          <StyledNavLink exact to={`${path}/collab-invitations`}>
            Invitations
          </StyledNavLink>
          <StyledNavLink exact to={`${path}/collab-requests`}>
            Requests to join
          </StyledNavLink>
        </Paper>
        <Paper flex={1}>
          <Switch>
            <Route exact path={`${path}/info`}>
              <MyInformation />
            </Route>
            <Route exact path={`${path}/collabs`}>
              <MyCollabs />
            </Route>
            <Route exact path={`${path}/tasks`}>
              <MyTasks />
            </Route>
            <Route exact path={`${path}/collab-invitations`}>
              <CollabInvitations />
            </Route>
            <Route exact path={`${path}/collab-requests`}>
              <CollabRequests />
            </Route>
            <Redirect to="/profile/info" />
          </Switch>
        </Paper>
      </Flex>
    </Container>
  )
}

const StyledNavLink = styled(NavLink)`
  padding: 0.75rem 1rem;
  font-weight: 700;
  transition: color, background-color 300ms ease-out;
  &:hover,
  &.active {
    background-color: #964cff;
    color: white;
  }
`

export const MyInformation = () => {
  const { data: userInfoData, loading, error } = useGetCurrentUserInfoQuery()
  const [infoInput, setInfoInput] = useState<UpdateUserInfoInput>()

  const [
    updateInfo,
    { loading: updateInfoLoading, error: updateInfoError },
  ] = useUpdateUserInfoMutation({
    variables: {
      input: infoInput!,
    },
  })

  useEffect(() => {
    if (userInfoData?.currentUser) {
      const { currentUser } = userInfoData

      setInfoInput({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        title: currentUser.title,
        country: currentUser.country,
        bio: currentUser.bio,
      })
    }
  }, [userInfoData])

  const handleUpdateInfo = () => {
    if (updateInfoLoading || !userInfoData?.currentUser) return

    const { currentUser } = userInfoData

    const currentUserInfo = {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      title: currentUser.title,
      country: currentUser.country,
      bio: currentUser.bio,
    }

    if (JSON.stringify(currentUserInfo) === JSON.stringify(infoInput)) {
      return
    }

    updateInfo()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInfoInput(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  if (loading) return null
  if (error) return <span>Could not fetch profile info</span>
  // wait for the initial values to populate the inputs
  if (!infoInput) return null

  console.log(infoInput)
  console.log(
    'found',
    countryOptions.find(x => x.label === infoInput.country),
  )

  return (
    <Flex direction="column" p={4} width="100%">
      <Flex>
        <FormControl>
          <FormLabel htmlFor="first-name">First Name</FormLabel>
          <Input
            name="firstName"
            id="first-name"
            value={infoInput.firstName ?? ''}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="last-name">Last Name</FormLabel>
          <Input
            name="lastName"
            id="last-name"
            onChange={handleInputChange}
            value={infoInput.lastName ?? ''}
          />
        </FormControl>
      </Flex>
      <Flex>
        <FormControl>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input
            name="title"
            id="title"
            placeholder="e.g: Software Engineer, Frotn-End Engineer"
            onChange={handleInputChange}
            value={infoInput.title ?? ''}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="country">Country</FormLabel>
          <Select
            id="country"
            onChange={(e: any) =>
              setInfoInput({ ...infoInput, country: e?.value ?? null })
            }
            defaultValue={countryOptions.find(
              x => x.label === infoInput.country,
            )}
            options={countryOptions}
          />
        </FormControl>
      </Flex>
      <Flex>
        <FormControl>
          <FormLabel htmlFor="bio">Bio</FormLabel>
          <Textarea
            name="bio"
            id="bio"
            onChange={(e: any) =>
              setInfoInput({ ...infoInput, bio: e.target.value })
            }
            value={infoInput.bio ?? ''}
          />
        </FormControl>
      </Flex>
      <Button
        alignSelf="flex-end"
        onClick={handleUpdateInfo}
        variantColor="purple"
      >
        Update
      </Button>
    </Flex>
  )
}

export const MyCollabs = () => {
  const { data, loading, error } = useGetCurrentUserCollabsQuery()

  console.log(data)
  if (loading) return null
  if (error) return <span>Could not fetch collabs</span>
  return <div></div>
}

export const MyTasks = () => {
  const { data, loading, error } = useGetCurrentUserTasksQuery()

  console.log(data)
  if (loading) return null
  if (error) return <span>Could not fetch tasks</span>
  return <div></div>
}

export const CollabInvitations = () => {
  const { data, loading, error } = useGetCurrentUserCollabInvitationsQuery()

  console.log(data)
  if (loading) return null
  if (error) return <span>Could not fetch invitations</span>
  return <div></div>
}

export const CollabRequests = () => {
  const { data, loading, error } = useGetCurrentUserCollabRequestsQuery()

  console.log(data)
  if (loading) return null
  if (error) return <span>Could not fetch requests</span>
  return <div></div>
}
