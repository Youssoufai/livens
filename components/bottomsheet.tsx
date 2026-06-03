import GBottomSheet, {
  ANIMATION_CONFIGS,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { useFocusEffect } from '@react-navigation/native'
import { useNavigation } from 'expo-router'
import { XIcon } from 'lucide-react-native'
import { memo, useCallback, useEffect, useMemo, useRef } from 'react'
import { Keyboard, Pressable, StyleSheet, View } from 'react-native'
import { ReduceMotion } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Portal } from 'react-native-paper'

import { COLORS } from '@/constants/theme'

import { type CustomBottomSheetProps } from './components.types'
import Text from './text'

const animationConfig = {
  ...ANIMATION_CONFIGS,
  reduceMotion: ReduceMotion.Never,
}

const BottomSheet = memo(
  ({
    portalName = 'bottomsheet-portal',
    title,
    description,
    children,
    snapPoints,
    index,
    lastIndex = 0,
    isVisible,
    alignIcon = 'right',
    backdropComponent,
    enableDynamicSizing = false,
    enablePanDownToClose,
    backdropPress = 'none',
    backdropOpacity = 0.6,
    disappearsOnIndex = -1,
    showIndicator = false,
    backgroundColor = COLORS.white,
    onClose,
    hideCloseIcon,
  }: CustomBottomSheetProps) => {
    const bottomSheetRef = useRef<GBottomSheet>(null)
    const isMounted = useRef(false)
    const wasVisible = useRef(false)
    const navigation = useNavigation()

    const top = useSafeAreaInsets().top
    const bottom = useSafeAreaInsets().bottom

    useEffect(() => {
      if (!isMounted.current) {
        isMounted.current = true
        wasVisible.current = isVisible
        return
      }

      if (isVisible) {
        if (snapPoints?.length > 1) {
          bottomSheetRef.current?.snapToIndex(0)
        } else {
          bottomSheetRef.current?.snapToPosition(Number(snapPoints?.[0]) || 0)
        }
      } else {
        bottomSheetRef.current?.close()
      }
      wasVisible.current = isVisible
    }, [isVisible, snapPoints])

    useEffect(() => {
      const sub = Keyboard.addListener('keyboardDidHide', () => {
        bottomSheetRef.current?.snapToIndex(index ?? -1) // or lastIndex
      })
      return () => sub.remove()
    }, [index])

    useFocusEffect(
      useCallback(() => {
        const unsubscribe = navigation.addListener('state', () => {
          if (wasVisible.current) {
            bottomSheetRef.current?.close()
            wasVisible.current = false
            onClose?.()
          }
        })

        return () => {
          unsubscribe()
        }
      }, [navigation, onClose])
    )

    const handleClose = useCallback(() => {
      if (onClose) {
        onClose()
      }
      bottomSheetRef.current?.close()
      wasVisible.current = false
    }, [onClose])

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          pressBehavior={backdropPress}
          opacity={backdropOpacity || 1}
          disappearsOnIndex={disappearsOnIndex}
          appearsOnIndex={lastIndex}
          onPress={() => {
            Keyboard.dismiss()
          }}
        />
      ),
      [lastIndex, disappearsOnIndex, backdropOpacity, backdropPress]
    )

    const bottomSheetBg = useMemo(
      () => [styles.bg, { backgroundColor }],
      [backgroundColor]
    )

    console.log(title)

    return (
      <Portal>
        <GBottomSheet
          snapPoints={snapPoints}
          index={index}
          enableDynamicSizing={enableDynamicSizing}
          animationConfigs={animationConfig}
          enablePanDownToClose={enablePanDownToClose}
          ref={bottomSheetRef}
          backdropComponent={backdropComponent || renderBackdrop}
          style={styles.main}
          containerStyle={styles.container}
          backgroundStyle={bottomSheetBg}
          detached={false}
          topInset={top}
          enableOverDrag={false}
          overDragResistanceFactor={10}
          handleIndicatorStyle={[
            styles.indicator,
            !showIndicator && { backgroundColor: 'transparent' },
          ]}
          keyboardBehavior="interactive"
          keyboardBlurBehavior="restore"
          onClose={handleClose}
        >
          <BottomSheetView
            style={[styles.contentWrapper, { paddingBottom: bottom }]}
          >
            <View style={styles.content}>
              <View
                style={{
                  position: 'relative',
                  marginTop: showIndicator ? 10 : 0,
                }}
              >
                <View style={styles.header}>
                  {title && (
                    <Text
                      size={24}
                      lineHeight={32}
                      color="grey-800"
                      weight={700}
                      style={styles.title}
                    >
                      {title}
                    </Text>
                  )}

                  {description && (
                    <Text
                      size={16}
                      lineHeight={24}
                      weight={500}
                      color="grey-800"
                    >
                      {description}
                    </Text>
                  )}
                </View>
                {!hideCloseIcon && onClose && !showIndicator && (
                  <Pressable
                    style={[
                      styles.xIcon,
                      {
                        left:
                          alignIcon && alignIcon === 'left' ? 10 : undefined,
                        right:
                          alignIcon && alignIcon === 'right' ? 10 : undefined,
                      },
                    ]}
                    onPress={handleClose}
                  >
                    <XIcon size={20} color="#000000" />
                  </Pressable>
                )}
              </View>
              {children}
            </View>
          </BottomSheetView>
        </GBottomSheet>
      </Portal>
    )
  }
)

const styles = StyleSheet.create({
  main: {
    paddingTop: 10,
    paddingBottom: 4,
    flex: 1,
    position: 'relative',
  },
  container: {
    flex: 1,
  },
  contentWrapper: {
    height: '100%',
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
  },
  title: {},
  header: {
    rowGap: 8,
  },
  bg: {
    backgroundColor: COLORS.white,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  indicator: {
    backgroundColor: '#00000059',
    height: 2,
    width: 75,
  },
  xIcon: {
    position: 'absolute',
    top: 5,
  },
})

export default BottomSheet
