import { STORE_KEYS } from '@/constants'
import AppStorage from '@/utils/storage'

export const storePreference = (
  storage: AppStorage,
  config: { key: keyof UserPreference; value: boolean }
) => {
  const storedPreference = storage.getItem<'string'>(STORE_KEYS.preference)

  const preference = storedPreference ? JSON.parse(storedPreference) : {}

  storage.setItem(
    STORE_KEYS.preference,
    JSON.stringify({ ...preference, [config.key]: config.value })
  )
}
