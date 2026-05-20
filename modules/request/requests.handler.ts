import { parseISO, isValid, differenceInSeconds, addHours } from 'date-fns'

export const getDuration = (expiration: string) => {
  if (!expiration) return 0

  const parsedDate = parseISO(expiration.replace(' ', 'T'))

  if (!isValid(parsedDate)) return 0

  return Math.max(0, differenceInSeconds(parsedDate, new Date()))
}

const parseDurationToHours = (duration: string): number => {
  const hourMatch = duration.match(/(\d+(?:\.\d+)?)\s*hour/i)
  const minMatch = duration.match(/(\d+(?:\.\d+)?)\s*min/i)
  const hours = hourMatch ? parseFloat(hourMatch[1]) : 0
  const mins = minMatch ? parseFloat(minMatch[1]) : 0
  if (hours === 0 && mins === 0) {
    const plain = parseFloat(duration)
    return isNaN(plain) ? 0 : plain
  }
  return hours + mins / 60
}

export const getTimeLeftFromDuration = (
  duration: string,
  createdAt: string
): string => {
  const hours = parseDurationToHours(duration)
  if (isNaN(hours) || hours <= 0) return 'Expired'

  const created = parseISO(createdAt.replace(' ', 'T'))
  if (!isValid(created)) return 'Expired'

  const deadline = addHours(created, hours)
  const secondsLeft = differenceInSeconds(deadline, new Date())
  if (secondsLeft <= 0) return 'Expired'

  const totalMins = Math.floor(secondsLeft / 60)
  const hoursLeft = Math.floor(totalMins / 60)
  const minsLeft = totalMins % 60

  if (hoursLeft === 0) return `${totalMins} min${totalMins !== 1 ? 's' : ''}`
  if (minsLeft === 0) return `${hoursLeft} hour${hoursLeft !== 1 ? 's' : ''}`
  return `${hoursLeft} hour${hoursLeft !== 1 ? 's' : ''} ${minsLeft} min${minsLeft !== 1 ? 's' : ''}`
}

export const formatToHHMMSS = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  const pad = (n: number) => String(n).padStart(2, '0')

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}
