export function generateArray<T = string>(
  length: number,
  defaultValue: T = '' as T
): T[] {
  return Array.from({ length }, () => defaultValue)
}

export const generateId = () => Math.random().toString(36).slice(2)
