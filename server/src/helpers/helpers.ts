export const isNotNull = <T>(val: T | null): val is T => val !== null

// used to run a function when a user unsubscribe from
// a graphql subscription
// taken from https://github.com/apollographql/graphql-subscriptions/issues/99#issuecomment-557892911
export const withCancel = <T>(
  asyncIterator: AsyncIterator<T | undefined>,
  onCancel: () => void,
): AsyncIterator<T | undefined> => {
  if (!asyncIterator.return) {
    asyncIterator.return = () =>
      Promise.resolve({ value: undefined, done: true })
  }

  const savedReturn = asyncIterator.return.bind(asyncIterator)
  asyncIterator.return = () => {
    onCancel()
    return savedReturn()
  }

  return asyncIterator
}
