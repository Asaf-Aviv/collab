import { useGetCurrentUserQuery } from '../graphql/generates'
import { useTokenValidation } from '../providers'

export const useCurrentUser = () => {
  const { setHasBeenValidated } = useTokenValidation()
  const { data } = useGetCurrentUserQuery({
    onCompleted() {
      // delay the update after apollo write the
      // current user data into cache
      setTimeout(() => setHasBeenValidated(true), 0)
    },
  })

  return data?.currentUser
}
