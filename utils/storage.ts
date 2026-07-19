import { createMMKV, MMKV } from 'react-native-mmkv'
import * as SecureStore from 'expo-secure-store'
import * as Crypto from 'expo-crypto'

const ENCRYPTION_KEY_STORE_ID = 'mmkv_encryption_key'

let _mmkv: MMKV | null = null

export async function initStorage(): Promise<void> {
  let encryptionKey = await SecureStore.getItemAsync(ENCRYPTION_KEY_STORE_ID)

  if (!encryptionKey) {
    const bytes = await Crypto.getRandomBytesAsync(32)
    encryptionKey = Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
    await SecureStore.setItemAsync(ENCRYPTION_KEY_STORE_ID, encryptionKey)
  }

  _mmkv = createMMKV({ id: 'app-storage', encryptionKey })
}

export default class AppStorage {
  private get storage(): MMKV | null {
    return _mmkv
  }

  getItem<T extends 'string' | 'number' | 'boolean'>(
    key: string,
    type?: T
  ): T extends 'string'
    ? string | undefined
    : T extends 'number'
      ? number | undefined
      : boolean | undefined {
    if (!this.storage) return undefined as any

    if (type === 'boolean') {
      return this.storage.getBoolean(key) as any
    } else if (type === 'number') {
      return this.storage.getNumber(key) as any
    }

    return this.storage.getString(key) as any
  }

  setItem(key: string, value: string | number | boolean | ArrayBuffer) {
    this.storage?.set(key, value)
  }

  checkExistence(key: string) {
    return this.storage?.contains(key) ?? false
  }

  removeItem(key: string) {
    if (this.checkExistence(key)) {
      this.storage?.remove(key)
    }
  }
}
