const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

export const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en-US', options).format(new Date(Number(date)))

export const getAvatarUrl = (avatar: string | null | undefined) =>
  avatar ? process.env.REACT_APP_URL + avatar : undefined

console.log(process.env)
