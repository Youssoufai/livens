import { STORE_KEYS } from '@/constants'
import AppStorage from '@/utils/storage'

export const storePreference = (
  storage: AppStorage,
  config: { key: keyof UserPreference; value: boolean },
  userId: string
) => {
  const preferenceKey = `${STORE_KEYS.preference}_${userId}`
  const storedPreference = storage.getItem<'string'>(preferenceKey)

  const preference = storedPreference ? JSON.parse(storedPreference) : {}

  storage.setItem(
    preferenceKey,
    JSON.stringify({ ...preference, [config.key]: config.value })
  )
}
