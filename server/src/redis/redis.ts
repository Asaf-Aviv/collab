import Redis from 'ioredis'

export const redis = new Redis({
  showFriendlyErrorStack: process.env.NODE_ENV !== 'production',
})

export const REDIS_CHAT_USERS = 'chat:users:'
