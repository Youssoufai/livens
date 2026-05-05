export const generateArray = (length: number) => {
  return Array.from<string>({ length }).fill('_')
}
