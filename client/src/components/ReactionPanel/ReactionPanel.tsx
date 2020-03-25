import React, {
  useState,
  useEffect,
  useRef,
  RefObject,
  useCallback,
} from 'react'
import { NimblePicker, EmojiData } from 'emoji-mart'
import twitterEmojiData from 'emoji-mart/data/twitter.json'
import 'emoji-mart/css/emoji-mart.css'
import { Button, Flex, Box } from '@chakra-ui/core'
import './emoji-picker.css'
import { useAddCollabPostReactionMutation } from '../../graphql/generates'
import { useParams } from 'react-router-dom'

type Props = {}

const emojiContainerStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 10,
  zIndex: 10,
  transform: 'translateY(-50%)',
  boxShadow: '4px 8px 20px #b9b9b9',
}

const useOnOutsideClick = (
  ref: RefObject<HTMLElement>,
  callback: () => void,
) => {
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current?.contains(e.target as Node)) return
      callback()
    }

    document.addEventListener('click', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick as any)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
      document.removeEventListener('touchstart', handleOutsideClick as any)
    }
  }, [ref, callback])
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
        sheetSize={64}
        showSkinTones={false}
        exclude={['symbols']}
        onSelect={onSelect}
      />
    </Box>
  )
}

export const ReactionPanel = (props: Props) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false)
  const [addReaction] = useAddCollabPostReactionMutation()
  const { postId } = useParams<{ postId: string }>()

  const handleEmojiSelect = (emoji: EmojiData) => {
    if (!emoji.id) return

    console.log(emoji)
    addReaction({
      variables: {
        reaction: {
          emojiId: emoji.id,
          postId,
        },
      },
    })
  }

  const togglePicker = () => setIsPickerOpen(prevState => !prevState)

  return (
    <div>
      <Flex>
        <Button onClick={togglePicker}>React</Button>
        {isPickerOpen && (
          <EmojiPicker
            closePicker={togglePicker}
            onSelect={handleEmojiSelect}
          />
        )}
      </Flex>
    </div>
  )
}
