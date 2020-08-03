import React, { useRef, useState, useEffect } from 'react'
import Cropper from 'react-easy-crop'
import {
  Box,
  Avatar,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalBody,
  Button,
} from '@chakra-ui/core'
import styled from '@emotion/styled'
import { Area } from 'react-easy-crop/types'
import { getCroppedImg } from './cropImage'
import { useUploadAvatarMutation } from '../../../graphql/generates'
import { useCurrentUser } from '../../../providers'
import { getAvatarUrl } from '../../../utils'
import { useToastNotification } from '../../notifications'

function readFile(file: any) {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}

export const UploadAvatar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const notify = useToastNotification()
  const [uploadAvatar, { loading }] = useUploadAvatarMutation({
    onCompleted() {
      notify('success', {
        message: 'Avatar uploaded successfully',
      })
      setIsModalOpen(false)
    },
    onError({ message }) {
      notify('error', {
        message,
      })
    },
  })
  const [avatarCropProps, setAvatarCropProps] = useState({
    image: '',
    crop: { x: 0, y: 0 },
    zoom: 1,
    aspect: 4 / 4,
    cropSize: { width: 254, height: 254 },
    croppedAreaPixels: (null as unknown) as Area,
    croppedImage: null,
    isCropping: false,
  })
  const inputRef = useRef<HTMLInputElement>(null!)
  const currentUser = useCurrentUser()!

  useEffect(() => {
    if (avatarCropProps.image) {
      setIsModalOpen(true)
    }
  }, [avatarCropProps.image])

  const handleAvatarUpload = async () => {
    try {
      const croppedImage = await getCroppedImg(
        avatarCropProps.image,
        avatarCropProps.croppedAreaPixels,
      )
      uploadAvatar({
        variables: {
          avatar: croppedImage,
        },
      })
      // eslint-disable-next-line no-empty
    } catch {}
  }

  const onCropChange = (crop: { x: number; y: number }) => {
    setAvatarCropProps(prevState => ({
      ...prevState,
      crop,
    }))
  }

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setAvatarCropProps(prevState => ({
      ...prevState,
      croppedAreaPixels,
    }))
  }

  const onFileChange = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const imageDataUrl = (await readFile(file)) as any

      setAvatarCropProps(prevState => ({
        ...prevState,
        image: imageDataUrl,
        crop: { x: 0, y: 0 },
        zoom: 1,
      }))
    }
  }

  const onZoomChange = (zoom: number) => {
    setAvatarCropProps(prevState => ({
      ...prevState,
      zoom,
    }))
  }

  return (
    <Box py={4}>
      <StyledButton
        aria-label="Change profile avatar"
        onClick={() => inputRef.current.click()}
      >
        <Avatar
          src={getAvatarUrl(currentUser.avatar)}
          name={currentUser.username}
          size="lg"
        />
      </StyledButton>
      <input ref={inputRef} type="file" hidden onChange={onFileChange} />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent height="100%" mb={0}>
          <ModalBody height="100%" p={0}>
            <Box height="80%" position="relative">
              <Cropper
                {...avatarCropProps}
                onCropChange={onCropChange}
                onCropComplete={onCropComplete}
                onZoomChange={onZoomChange}
              />
            </Box>
            <Button
              mx="auto"
              display="block"
              mt={4}
              variantColor="purple"
              isDisabled={loading}
              onClick={() => handleAvatarUpload()}
            >
              Upload Avatar
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

const StyledButton = styled.button`
  outline: none;
  border-radius: 50%;
  margin: auto;
  display: block;

  :focus {
    box-shadow: 0 0 3px 2px #964cff;
  }
`
