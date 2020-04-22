import { useGetCurrentUserQuery } from '../graphql/generates'

export const useCurrentUser = () => {
  const { data } = useGetCurrentUserQuery()
  return data?.currentUser
}
