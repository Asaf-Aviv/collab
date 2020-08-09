import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  useNewPrivateChatMessageSubscription,
  useFriendStatusChangeSubscription,
} from '../../../graphql/generates'
import { userActions, messagesActions } from '../reducers/reducers'

const formatUser = ({ user, status }: any) => ({
  ...user,
  status,
})

export const useChatSubscriptions = () => {
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
