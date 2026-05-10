import { useRouter } from 'expo-router'
import { ArrowLeft } from 'lucide-react-native'
import { ReactElement } from 'react'
import { BackHandler, Pressable, StyleSheet } from 'react-native'

export const BackButton = ({
  routingFunc,
  icon,
}: {
  routingFunc?: VoidFunction
  icon?: ReactElement
}) => {
  const router = useRouter()

  return (
    <Pressable
      onPress={
        routingFunc ||
        (() => {
          if (router.canGoBack()) {
            router.back()
          } else {
            BackHandler.exitApp()
          }
        })
      }
      style={({ pressed }) => [styles.btn, pressed && { opacity: 0.7 }]}
      hitSlop={10}
    >
      {icon || <ArrowLeft size={24} color="#1C1B1F" />}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  btn: {},
})

export default BackButton
