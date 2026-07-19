let token: string | undefined

export const sessionToken = {
  get: () => token,
  set: (value: string) => {
    token = value
  },
  clear: () => {
    token = undefined
  },
}
