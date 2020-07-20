import React, { useState, useRef } from 'react'
import { NimblePicker, EmojiData, Emoji } from 'emoji-mart'
import appleEmojiData from 'emoji-mart/data/apple.json'
import 'emoji-mart/css/emoji-mart.css'
import {
  Button,
  Flex,
  Text,
  FlexProps,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/core'
import FocusLock from 'react-focus-lock'
import './emoji-picker.css'
import { Reaction } from '../../graphql/generates'
import { useOnOutsideClick } from '../../hooks/useOnOutsideClick'
import { useKey } from '../../hooks/useKey'

type Props = FlexProps & {
  reactions: Reaction[]
  addReaction: (emojiId: string) => void
  removeReaction: (emojiId: string) => void
}

export const ReactionPanel = ({
  reactions,
  addReaction,
  removeReaction,
  ...props
}: Props) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false)

  const togglePicker = () => setIsPickerOpen(prevState => !prevState)

  const emojiContainerRef = useRef<HTMLDivElement | null>(null)

  const closePicker = () => {
    if (isPickerOpen) {
      setIsPickerOpen(false)
    }
  }

  useOnOutsideClick(emojiContainerRef, closePicker, isPickerOpen)
  useKey(['Esc', 'Escape'], closePicker, isPickerOpen)

  const handleEmojiSelect = (emoji: EmojiData) => {
    if (!emoji?.id) return

    const reaction = reactions.find(({ emojiId }) => emojiId === emoji.id)
    if (reaction?.isLiked) return

    addReaction(emoji.id)
    togglePicker()
  }

  const handleReactionRemoval = (emojiId: string) => {
    removeReaction(emojiId)
  }

  const handleEmojiReactionClick = (emojiId: string, isLiked: boolean) => {
    if (isLiked) {
      handleReactionRemoval(emojiId)
      return
    }
    addReaction(emojiId)
  }

  return (
    <Flex {...props}>
      <Flex>
        {reactions.map(({ isLiked, emojiId, count }) => (
          <Button
            key={emojiId}
            mr="px"
            onClick={() => handleEmojiReactionClick(emojiId, isLiked)}
            variantColor={isLiked ? 'purple' : 'gray'}
            px={2}
            borderRadius={0}
            _hover={{
              bg: 'purple.600',
            }}
          >
            <Emoji emoji={emojiId} size={20} set="apple" />
            <Text ml={1} fontWeight={700} fontSize="md">
              {count}
            </Text>
          </Button>
        ))}
      </Flex>
      <Popover isOpen={isPickerOpen} placement="right-start">
        <PopoverTrigger>
          <Button
            onClick={togglePicker}
            p={0}
            width="40px"
            height="40px"
            position="relative"
          >
            <Emoji size={20} emoji="sunglasses" set="apple" />
            <Icon name="add" size="12px" ml={1} mt="-15px" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          zIndex={4}
          border="none"
          boxShadow="lg"
          maxWidth="none"
          width="auto"
        >
          <FocusLock ref={emojiContainerRef}>
            <NimblePicker
              style={{ maxWidth: 376 }}
              set="apple"
              data={appleEmojiData as any}
              showPreview={false}
              sheetSize={64}
              showSkinTones={false}
              exclude={['symbols']}
              onSelect={handleEmojiSelect}
            />
          </FocusLock>
        </PopoverContent>
      </Popover>
    </Flex>
  )
}
