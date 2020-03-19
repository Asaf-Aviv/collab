const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

export const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en-US', options).format(new Date(Number(date)))
