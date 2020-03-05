export const replaceErrorWithNull = <T>(val: T | Error | null) =>
  val instanceof Error ? null : val
