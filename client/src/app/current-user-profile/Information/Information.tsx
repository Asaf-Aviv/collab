import React, { useState, useEffect } from 'react'
import {
  Flex,
  FormControl,
  FormLabel,
  Button,
  Textarea,
  Heading,
  Box,
} from '@chakra-ui/core'
import Select from 'react-select'
import { countryOptions } from '../../../data/countryOptions'
import {
  useUpdateUserInfoMutation,
  UpdateUserInfoInput,
  useGetCurrentUserInfoQuery,
} from '../../../graphql/generates'
import { InputWithLabel } from '../../../components/InputWithLabel'
import styled from '@emotion/styled'
import { Loader } from '../../../components/Loader'
import { DisplayError } from '../../../components/DisplayError'

export const Information = () => {
  const {
    data: userInfoData,
    loading,
    error,
    refetch,
  } = useGetCurrentUserInfoQuery({
    notifyOnNetworkStatusChange: true,
  })
  const [infoInput, setInfoInput] = useState<UpdateUserInfoInput>(null as any)
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
      // eslint-disable-next-line
      const { id, __typename, ...userInfo } = currentUser

      setInfoInput(userInfo)
    }
  }, [userInfoData])

  const handleUpdateInfo = () => {
    if (updateInfoLoading || !userInfoData?.currentUser) return

    // eslint-disable-next-line
    const { id, __typename, ...userInfo } = userInfoData.currentUser

    if (JSON.stringify(userInfo) !== JSON.stringify(infoInput)) {
      updateInfo()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInfoInput(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <Box as="main" pb={4} flex={1}>
      <Heading as="h1" size="md" mb={4} fontWeight={500}>
        Edit your Information
      </Heading>
      {/* wait for the initial values to populate the inputs */}
      {infoInput && (
        <>
          <StyledFlex>
            <InputWithLabel
              name="firstName"
              pl={2}
              htmlFor="first-name"
              label="First Name"
              value={infoInput.firstName}
              onChange={handleInputChange}
              size="md"
            />
            <InputWithLabel
              name="lastName"
              pl={2}
              htmlFor="last-name"
              label="Last Name"
              value={infoInput.lastName}
              onChange={handleInputChange}
              size="md"
            />
            <InputWithLabel
              name="title"
              _placeholder={{
                fontSize: '0.75rem',
              }}
              htmlFor="title"
              label="Title"
              pl={2}
              value={infoInput.title}
              onChange={handleInputChange}
              size="md"
              placeholder="E.X: Software Engineer, Front-End Engineer"
            />
            <InputWithLabel
              name="twitter"
              pl={2}
              htmlFor="twitter"
              label="Twitter"
              value={infoInput.twitter}
              onChange={handleInputChange}
              size="md"
            />
            <InputWithLabel
              name="github"
              pl={2}
              htmlFor="github"
              label="Github"
              value={infoInput.github}
              onChange={handleInputChange}
              size="md"
            />
            <InputWithLabel
              name="linkedin"
              pl={2}
              htmlFor="linkedin"
              label="Linkedin"
              value={infoInput.linkedin}
              onChange={handleInputChange}
              size="md"
            />
            <FormControl>
              <FormLabel htmlFor="country">Country</FormLabel>
              <Select
                id="country"
                options={countryOptions}
                onChange={(e: any) =>
                  setInfoInput({ ...infoInput, country: e?.value ?? null })
                }
                defaultValue={countryOptions.find(
                  x => x.label === infoInput.country,
                )}
              />
            </FormControl>
            <FormControl width="100%">
              <FormLabel htmlFor="bio">Bio</FormLabel>
              <Textarea
                name="bio"
                id="bio"
                bg="#f2f2ff"
                p={2}
                mb={4}
                _hover={{ borderColor: '#cab3ff' }}
                _focus={{ borderColor: '#805ad5' }}
                value={infoInput.bio ?? ''}
                onChange={handleInputChange}
                minHeight={140}
              />
            </FormControl>
          </StyledFlex>
          <Button
            ml="auto"
            display="block"
            onClick={handleUpdateInfo}
            isLoading={updateInfoLoading}
            loadingText="Updating"
            variantColor="purple"
          >
            Update
          </Button>
        </>
      )}
      {loading && <Loader />}
      {error && (
        <DisplayError
          message="Could not fetch information"
          onClick={() => refetch()}
        />
      )}
    </Box>
  )
}

const StyledFlex = styled(Flex)`
  flex-wrap: wrap;
  justify-content: space-between;

  > *:not(:last-child) {
    width: 100%;
    margin-bottom: 1rem;
    @media (min-width: 786px) {
      width: 48%;
    }
  }
`
