import { useGetCurrentUserQuery } from '../graphql/generates'
import { useTokenValidation } from '../components/TokenValidatonProvider/TokenValidatonProvider'

export const useCurrentUser = () => {
  const { setHasBeenValidated } = useTokenValidation()
  const { data } = useGetCurrentUserQuery({
    onCompleted() {
      setHasBeenValidated(true)
    },
  })

  return data?.currentUser
}
