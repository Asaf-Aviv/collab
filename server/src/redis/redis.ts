import Redis from 'ioredis'

export const redis = new Redis({
  showFriendlyErrorStack: process.env.NODE_ENV !== 'production',
})

redis.flushall().catch(err => {
  console.log('flush all error', err)
})

export const REDIS_CHAT_USERS = 'chat:users:'
