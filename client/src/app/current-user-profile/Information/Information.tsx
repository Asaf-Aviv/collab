import React, { useState, useEffect } from 'react'
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
} from '@chakra-ui/core'
import Select from 'react-select'
import { countryOptions } from '../../../data/countryOptions'
import {
  useUpdateUserInfoMutation,
  UpdateUserInfoInput,
  useGetCurrentUserInfoQuery,
} from '../../../graphql/generates'

export const Information = () => {
  const { data: userInfoData, loading, error } = useGetCurrentUserInfoQuery()
  const [infoInput, setInfoInput] = useState<UpdateUserInfoInput>()

  const [
    updateInfo,
    { loading: updateInfoLoading /*  error: updateInfoError */ },
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

  return (
    <Flex flexDirection="column" p={4} width="100%">
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
