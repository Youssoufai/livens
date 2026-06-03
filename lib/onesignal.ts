import { OneSignal } from 'react-native-onesignal'

export const getPushSubscriptionId = async () => {
  try {
    const alreadyGranted = await OneSignal.Notifications.getPermissionAsync()
    let isGranted = false

    if (alreadyGranted) {
      isGranted = true
    } else {
      isGranted = await OneSignal.Notifications.requestPermission(true)
    }

    if (!isGranted) throw Error('Permission denied')

    const id = await OneSignal.User.pushSubscription.getIdAsync()
    return id
  } catch (error) {
    throw error
  }
}
