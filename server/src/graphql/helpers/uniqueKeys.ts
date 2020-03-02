export const uniqueKeys = (arr: string[] | readonly string[]) => [
  ...new Set(arr),
]
