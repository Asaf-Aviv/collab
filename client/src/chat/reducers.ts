import {
  configureStore,
  createSlice,
  PayloadAction,
  combineReducers,
} from '@reduxjs/toolkit'
import { UserChatStatus, User as GQLUser } from '../graphql/generates'

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

type Message = {
  authorId: string
  content: string
  creationDate: string
}

type MessageSent = {
  recipientId: string
  message: Message
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {} as Record<string, Message[]>,
  reducers: {
    newMessage: (state, action: PayloadAction<Message>) => {
      const { authorId } = action.payload
      state[authorId] = state[authorId] || []
      state[authorId].push(action.payload)
    },
    messageSent: (state, action: PayloadAction<MessageSent>) => {
      const { recipientId, message } = action.payload
      state[recipientId] = state[recipientId] || []
      state[recipientId].push(message)
    },
    clear: () => {},
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
