import React, { useState, useEffect } from 'react'
import {
  useConnectToChatMutation,
  UserChatStatus,
  useNewPrivateChatMessageSubscription,
  useFriendStatusChangeSubscription,
  useSendPrivateChatMessageMutation,
  useUpdateStatusMutation,
} from '../graphql/generates'
import { userActions, RootState, messagesActions } from './reducers'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Textarea } from '@chakra-ui/core'

const formatUser = ({ user, status }: any) => ({
  ...user,
  status,
})

const ChatStatus = () => {
  const [status, setStatus] = useState(UserChatStatus.Online)
  const [updateStatus] = useUpdateStatusMutation({
    variables: {
      status,
    },
  })

  useEffect(() => {
    updateStatus()
  }, [updateStatus, status])

  return <Button onClick={() => setStatus(UserChatStatus.Away)}>change</Button>
}

const useChatSubscriptions = () => {
  const friendStatusChange = useFriendStatusChangeSubscription()
  const newPrivateChatMessage = useNewPrivateChatMessageSubscription()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!friendStatusChange.data) return

    dispatch(
      userActions.userStatusChanged(
        formatUser(friendStatusChange.data.friendStatusChange),
      ),
    )
  }, [friendStatusChange.data, dispatch])

  useEffect(() => {
    if (!newPrivateChatMessage.data) return

    dispatch(
      messagesActions.newMessage(
        newPrivateChatMessage.data.newPrivateChatMessage,
      ),
    )
  }, [newPrivateChatMessage.data, dispatch])
}

export const Chat = () => {
  useChatSubscriptions()
  const [connected, setConnected] = useState(false)
  const [selectedFriendId, setSelectedFriendId] = useState<string | null>(null)
  const dispatch = useDispatch()
  const [connectToChat] = useConnectToChatMutation({
    variables: {
      status: UserChatStatus.Online,
    },
    onCompleted({ connectToChat }) {
      const users = connectToChat.users.map(formatUser)
      dispatch(userActions.receivedInitialUsers(users))
      setConnected(true)
    },
  })

  useEffect(() => {
    connectToChat()
  }, [connectToChat])

  const openChatBox = (friendId: string) => {
    setSelectedFriendId(prevState => (prevState === friendId ? null : friendId))
  }

  return (
    <div>
      {connected && (
        <div>
          <ChatUsers openChatBox={openChatBox} />
          <ChatStatus />
          {selectedFriendId && <ChatBox friendId={selectedFriendId} />}
        </div>
      )}
    </div>
  )
}

const ChatUsers = ({
  openChatBox,
}: {
  openChatBox: (friendId: string) => void
}) => {
  const users = useSelector((state: RootState) =>
    Object.values(state.users).sort((a, b) =>
      a.username.toLowerCase().localeCompare(b.username.toLowerCase()),
    ),
  )
  console.log(users)

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          <Button onClick={() => openChatBox(user.id)}>{user.username}</Button>
        </li>
      ))}
    </ul>
  )
}

const ChatBox = ({ friendId }: { friendId: string }) => {
  const friend = useSelector((state: RootState) => state.users[friendId])

  console.log(friend)

  return (
    <div>
      <ChatMessages friendId={friendId} />
      <ChatInputBox friendId={friendId} />
    </div>
  )
}

const ChatMessages = ({ friendId }: { friendId: string }) => {
  const messages = useSelector((state: RootState) => state.messages[friendId])

  return <div>{JSON.stringify(messages)}</div>
}

const ChatInputBox = ({ friendId }: { friendId: string }) => {
  const dispatch = useDispatch()
  const [messageContent, setMessageContent] = useState('')
  const [sendMessage] = useSendPrivateChatMessageMutation({
    variables: {
      input: {
        recipientId: friendId,
        content: 'hello',
      },
    },
    onCompleted({ sendPrivateChatMessage }) {
      setMessageContent('')
      dispatch(
        messagesActions.messageSent({
          recipientId: friendId,
          message: sendPrivateChatMessage,
        }),
      )
    },
  })

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && messageContent) {
      sendMessage()
    }
  }

  return (
    <div>
      <Textarea
        onKeyPress={handleKeyDown}
        value={messageContent}
        onChange={(e: any) => setMessageContent(e.target.value)}
      />
    </div>
  )
}
