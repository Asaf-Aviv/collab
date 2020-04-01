import React, { useState, useRef, useCallback } from 'react'
import { NimblePicker, EmojiData, Emoji } from 'emoji-mart'
import twitterEmojiData from 'emoji-mart/data/twitter.json'
import 'emoji-mart/css/emoji-mart.css'
import { Button, Flex, Box, Text } from '@chakra-ui/core'
import './emoji-picker.css'
import { Reaction } from '../../graphql/generates'
import { useOnOutsideClick } from '../../hooks/useOnOutsideClick'

const emojiContainerStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 10,
  zIndex: 10,
  transform: 'translateY(-50%)',
  boxShadow: '4px 8px 20px #b9b9b9',
}

const EmojiPicker = ({
  closePicker,
  onSelect,
}: {
  closePicker: () => void
  onSelect: (emoji: EmojiData) => void
}) => {
  const emojiContainerRef = useRef<HTMLDivElement>(null!)

  useOnOutsideClick(emojiContainerRef, useCallback(closePicker, []))

  return (
    <Box ref={emojiContainerRef} position="relative">
      <NimblePicker
        style={emojiContainerStyle}
        set="twitter"
        data={twitterEmojiData as any}
        showPreview={false}
        sheetSize={32}
        showSkinTones={false}
        exclude={['symbols']}
        onSelect={onSelect}
      />
    </Box>
  )
}

type Props = {
  reactions: Reaction[]
  addReaction: (emojiId: string) => void
  removeReaction: (emojiId: string) => void
}

export const ReactionPanel = ({
  reactions,
  addReaction,
  removeReaction,
}: Props) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false)

  const togglePicker = () => setIsPickerOpen(prevState => !prevState)

  const handleEmojiSelect = (emoji: EmojiData) => {
    console.log(emoji)
    if (!emoji.id) return

    const reaction = reactions.find(({ emojiId }) => emojiId === emoji.id)
    console.log(reaction)
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
    <Flex>
      <Flex>
        {reactions.map(({ isLiked, emojiId, count }) => (
          <Button
            mr="px"
            as={Flex}
            // @ts-ignore
            align="center"
            onClick={() => handleEmojiReactionClick(emojiId, isLiked)}
            variantColor={isLiked ? 'purple' : 'gray'}
            key={emojiId}
            cursor="pointer"
            borderRadius={0}
            _hover={{
              backgroundColor: 'purple',
            }}
          >
            <Emoji emoji={emojiId} size={32} />
            <Text ml={1} fontWeight={700} fontSize="md">
              {count}
            </Text>
          </Button>
        ))}
      </Flex>
      <Button variantColor="blue" borderRadius={0} onClick={togglePicker}>
        React
      </Button>
      {isPickerOpen && (
        <EmojiPicker closePicker={togglePicker} onSelect={handleEmojiSelect} />
      )}
    </Flex>
  )
}
