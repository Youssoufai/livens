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
