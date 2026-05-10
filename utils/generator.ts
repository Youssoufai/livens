export function generateArray<T>(
  length: number,
  defaultValue?: T
): (T | undefined)[] {
  return Array.from({ length }, () => defaultValue)
}
