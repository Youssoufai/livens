import { parseISO, isValid, differenceInSeconds, addHours } from 'date-fns'
import { File, Paths } from 'expo-file-system'

import { getFilenameFromUrl } from '@/hooks/use-device-files'
import { Message } from '@/services/chat/chat.types'

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

export function generateRequestTitle(text: string) {
  const trimmed = text.trim()

  if (!trimmed) return ''

  const sentenceMatch = trimmed.match(/^(.+?[?.])/)
  const source = sentenceMatch ? sentenceMatch[1].trim() : trimmed

  const firstSpaceIdx = source.indexOf(' ')
  if (firstSpaceIdx === -1) return capitalize(source)

  const secondSpaceIdx = source.indexOf(' ', firstSpaceIdx + 1)
  if (secondSpaceIdx !== -1) {
    return capitalize(source.slice(0, secondSpaceIdx))
  }

  return capitalize(source.slice(0, firstSpaceIdx))
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

function getMimeType(filename: string): string {
  const lower = filename.toLowerCase()
  if (lower.endsWith('.mp4')) return 'video/mp4'
  if (lower.endsWith('.mov')) return 'video/quicktime'
  if (lower.endsWith('.png')) return 'image/png'
  if (lower.endsWith('.gif')) return 'image/gif'
  if (lower.endsWith('.webp')) return 'image/webp'
  return 'image/jpeg'
}

export const storeMediaViaUrl = async (url: string): Promise<FileType> => {
  const filename = getFilenameFromUrl(url).split('?')[0]
  const type = getMimeType(filename)

  const tempUri = `${Paths.cache.uri}${filename}`
  const tempFile = new File(tempUri)

  await File.downloadFileAsync(url, tempFile)

  return { uri: tempFile.uri, name: filename, type }
}

export const getResponderName = (users: { id: string; user_id: string }[]) => {
  return users.map((user) => user.user_id)
}
