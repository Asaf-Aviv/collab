import { useGetCurrentUserQuery } from '../graphql/generates'
import { useTokenValidation } from '../providers'
import { useEffect } from 'react'
import { wsClient } from '../apolloClient'

export const useCurrentUser = () => {
  const { setHasBeenValidated } = useTokenValidation()
  const { data } = useGetCurrentUserQuery({
    onCompleted() {
      // delay the update after apollo write the
      // current user data into the cache
      // othwerwise private routes checks will fail
      setTimeout(() => setHasBeenValidated(true), 0)
    },
  })

  useEffect(() => {
    if (data) {
      console.log('current user', data.currentUser)
      // wsClient.close()
      // @ts-ignore
      // wsClient.connect()
    }
  }, [data])

  return data?.currentUser
}
