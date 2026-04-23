import { createMMKV, MMKV } from 'react-native-mmkv'

export default class AppStorage {
  private storage: MMKV

  constructor() {
    this.storage = createMMKV()
  }

  getItem<T extends 'string' | 'number' | 'boolean'>(
    key: string,
    type?: T
  ): T extends 'string'
    ? string | undefined
    : T extends 'number'
      ? number | undefined
      : boolean | undefined {
    if (type === 'boolean') {
      return this.storage.getBoolean(key) as any
    } else if (type === 'number') {
      return this.storage.getNumber(key) as any
    }

    return this.storage.getString(key) as any
  }

  setItem(key: string, value: string | number | boolean | ArrayBuffer) {
    this.storage.set(key, value)
  }

  checkExistence(key: string) {
    return this.storage.contains(key)
  }

  removeItem(key: string) {
    const hasKey = this.checkExistence(key)

    if (hasKey) {
      this.storage.remove(key)
    }
  }
}
