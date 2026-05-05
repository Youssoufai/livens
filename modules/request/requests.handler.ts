import {
  intervalToDuration,
  parseISO,
  isValid,
  differenceInSeconds,
} from 'date-fns'

export const getDuration = (expiration: string) => {
  if (!expiration) return 0

  const parsedDate = parseISO(expiration.replace(' ', 'T'))

  if (!isValid(parsedDate)) return 0

  return Math.max(0, differenceInSeconds(parsedDate, new Date()))
}

export const formatToHHMMSS = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  const pad = (n: number) => String(n).padStart(2, '0')

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}
