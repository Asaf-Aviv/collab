import {
  configureStore,
  createSlice,
  PayloadAction,
  combineReducers,
  createSelector,
} from '@reduxjs/toolkit'
import { UserChatStatus, User as GQLUser } from '../../../graphql/generates'

type User = Pick<GQLUser, 'id' | 'username' | 'avatar'> & {
  status: UserChatStatus
}

const usersSlice = createSlice({
  name: 'users',
  initialState: {} as Record<string, User>,
  reducers: {
    receivedInitialUsers: (state, action: PayloadAction<User[]>) => {
      action.payload.forEach(user => {
        state[user.id] = user
      })
    },
    userStatusChanged: (state, { payload }: PayloadAction<User>) => {
      state[payload.id] = payload
    },
    clear: () => {},
  },
})

export const { actions: userActions } = usersSlice
export const selectChatUsers = createSelector(
  ({ users }: RootState) => users,
  users => Object.values(users),
)

type Message = {
  id: string
  authorId: string
  content: string
  creationDate: string
}

type MessageSent = {
  recipientId: string
  message: Message
}

type MessagesState = {
  selectedFriendId: string | null
  totalUnreadCount: number
  byUserIds: Record<
    string,
    {
      messages: Message[]
      unreadCount: number
    }
  >
}

const initialState: MessagesState = {
  selectedFriendId: null,
  totalUnreadCount: 0,
  byUserIds: {},
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    newMessage: (state, action: PayloadAction<Message>) => {
      const message = action.payload
      const { authorId } = message
      const { byUserIds, selectedFriendId } = state

      byUserIds[authorId].messages.push(message)

      if (selectedFriendId !== authorId) {
        byUserIds[authorId].unreadCount++
        state.totalUnreadCount++
      }
    },
    messageSent: (state, action: PayloadAction<MessageSent>) => {
      const { recipientId, message } = action.payload
      state.byUserIds[recipientId].messages.push(message)
    },
    readMessages: state => {
      const { byUserIds, selectedFriendId } = state
      const { unreadCount } = byUserIds[selectedFriendId!]

      if (!unreadCount) return

      byUserIds[selectedFriendId!].unreadCount = 0
      state.totalUnreadCount -= unreadCount
    },
    selectedFriendIdChanged: (state, action: PayloadAction<string>) => {
      state.selectedFriendId =
        state.selectedFriendId === action.payload ? null : action.payload
    },
    closeChatBox: state => {
      state.selectedFriendId = null
    },
    clear: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(userActions.receivedInitialUsers, (state, action) => {
        action.payload.forEach(user => {
          state.byUserIds[user.id] = {
            messages: [],
            unreadCount: 0,
          }
        })
      })
      .addCase(userActions.userStatusChanged, (state, action) => {
        if (state.byUserIds[action.payload.id]) return
        state.byUserIds[action.payload.id] = {
          messages: [],
          unreadCount: 0,
        }
      })
  },
})

export const { actions: messagesActions } = messagesSlice

const rootReducer = combineReducers({
  users: usersSlice.reducer,
  messages: messagesSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>
