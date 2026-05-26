export const createDateFormatOptions = (
  day?: 'numeric' | '2-digit',
  month?: 'numeric' | '2-digit' | 'long' | 'short',
  year?: 'numeric' | '2-digit',
  weekday?: 'long' | 'short' | 'narrow',
  minute?: 'numeric' | '2-digit',
  hour?: 'numeric' | '2-digit'
): Intl.DateTimeFormatOptions => {
  const format = { year, month, day } as Intl.DateTimeFormatOptions

  if (hour) format.hour = hour

  if (minute) format.minute = minute

  if (weekday) format.weekday = weekday

  return format
}

export const formatDate = (
  date: Date | string | number | undefined,
  countCode: 'en-NG' | 'en-GB' | 'en-US' | 'zh-CH' = 'en-NG',
  day: '2-digit' | 'numeric' = '2-digit',
  month: '2-digit' | 'numeric' | 'long' | 'short' = '2-digit',
  weekday?: 'long' | 'short' | 'narrow'
) => {
  if (typeof date === 'string' || typeof date === 'number')
    date = new Date(date)

  if (typeof date === 'undefined') date = new Date()

  return new Intl.DateTimeFormat(
    countCode,
    createDateFormatOptions(day, month, 'numeric', weekday)
  ).format(date)
}

export function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return 'just now'

  const totalMinutes = Math.floor(seconds / 60)
  if (totalMinutes < 60)
    return `${totalMinutes} min${totalMinutes !== 1 ? 's' : ''} ago`

  const hours = Math.floor(totalMinutes / 60)
  const remainingMins = totalMinutes % 60

  if (hours < 24) {
    const hourStr = `${hours} hour${hours !== 1 ? 's' : ''}`
    if (remainingMins === 0) return `${hourStr} ago`
    return `${hourStr} ${remainingMins} min${remainingMins !== 1 ? 's' : ''} ago`
  }

  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} day${days !== 1 ? 's' : ''} ago`
  return date.toLocaleDateString()
}

export function getDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)}m away`
  return `${km.toFixed(1)}km away`
}

export function formatTimer(seconds: number): string {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  const paddedHours = String(hrs).padStart(2, '0')
  const paddedMinutes = String(mins).padStart(2, '0')
  const paddedSeconds = String(secs).padStart(2, '0')

  return hrs > 0
    ? `${paddedHours}:${paddedMinutes}:${paddedSeconds}`
    : `${paddedMinutes}:${paddedSeconds}`
}

export const currencyLocaleMap = {
  USD: 'en-US', // US Dollar
  EUR: 'de-DE', // Euro (Germany)
  GBP: 'en-GB', // British Pound
  JPY: 'ja-JP', // Japanese Yen
  CNY: 'zh-CN', // Chinese Yuan
  CAD: 'en-CA', // Canadian Dollar
  AUD: 'en-AU', // Australian Dollar
  CHF: 'fr-CH', // Swiss Franc
  NGN: 'en-NG', // Nigerian Naira
  ZAR: 'en-ZA', // South African Rand
  INR: 'en-IN', // Indian Rupee
  KES: 'sw-KE', // Kenyan Shilling
  GHS: 'en-GH', // Ghanaian Cedi
  EGP: 'ar-EG', // Egyptian Pound
  BRL: 'pt-BR', // Brazilian Real
  MXN: 'es-MX', // Mexican Peso
  RUB: 'ru-RU', // Russian Ruble
  TRY: 'tr-TR', // Turkish Lira
  SAR: 'ar-SA', // Saudi Riyal
  AED: 'ar-AE', // UAE Dirham
  SGD: 'en-SG', // Singapore Dollar
  HKD: 'zh-HK', // Hong Kong Dollar
  KRW: 'ko-KR', // South Korean Won
  SEK: 'sv-SE', // Swedish Krona
  NOK: 'nb-NO', // Norwegian Krone
  DKK: 'da-DK', // Danish Krone
}

export const formatCurrency = (
  amount = 0,
  minimumFractionDigits = 0,
  currency: keyof typeof currencyLocaleMap
) => {
  return new Intl.NumberFormat(currencyLocaleMap[currency], {
    currency,
    style: 'currency',
    minimumFractionDigits,
  }).format(amount)
}
