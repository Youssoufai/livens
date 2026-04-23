import { BadgeAlert, BadgeCheck, BadgeInfo, XIcon } from 'lucide-react-native'
import React, { ReactNode } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { toast, ToasterProps, ToastPosition } from 'sonner-native'

import { FONTS } from '@/constants/fonts'
import { COLORS } from '@/constants/theme'
import { actuateFontSize } from '@/utils/normalize'

const styles = StyleSheet.create({
  customToast: {
    width: '90%',
    borderRadius: 10,
    padding: 16,
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontFamily: FONTS.dm_sans[700],
    fontSize: actuateFontSize(16),
  },
  message: {
    color: '#fff',
    fontFamily: FONTS.dm_sans[500],
    fontSize: actuateFontSize(14),
  },
})

export const getToastIcon: (type: string) => ReactNode = (type) => {
  const typeIcons: Record<string, ReactNode> = {
    error: <BadgeAlert color={COLORS.white} fill={COLORS.danger} size={20} />,
    success: (
      <BadgeCheck color={COLORS.white} fill={COLORS.primary[500]} size={20} />
    ),
  }
  return typeIcons[type] ?? <BadgeInfo size={20} color={COLORS.grey[300]} />
}

const toastBackground: Record<string, string> = {
  success: COLORS.primary[500],
  error: COLORS.danger,
  default: COLORS.grey[500],
}

const CustomToast = ({
  type,
  text1,
  text2,
  iconSize,
  iconColor,
  backgroundColor,
  hide,
}: any) => {
  return (
    <View
      style={[
        styles.customToast,
        {
          backgroundColor: backgroundColor
            ? backgroundColor
            : (toastBackground[text2 || 'default'] ?? COLORS.grey[500]),
        },
      ]}>
      {/* {type ? (
        // getToastIcon(iconSize || 24)[text2 ?? "default"]
      ) : (
        <BadgeInfo size={iconSize} color={iconColor} />
      )} */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{text1}</Text>
      </View>
      <Pressable onPress={hide}>
        <XIcon color={COLORS.white} size={20} />
      </Pressable>
    </View>
  )
}

export function showToastMessage(
  message: string,
  type: 'success' | 'error' = 'success',
) {
  const options = {
    position: 'top-center' as ToastPosition,
    duration: 5000,
    icon: getToastIcon(type),
  }

  if (type === 'success') {
    toast.success(message, options)
  } else if (type === 'error') {
    toast.error(message, options)
  }
}

export const toastOptions: ToasterProps['toastOptions'] = {
  success: {
    backgroundColor: COLORS.primary[500],
  },
  error: {
    backgroundColor: COLORS.danger,
  },
  descriptionStyle: {
    color: COLORS.white,
  },
  titleStyle: {
    color: COLORS.white,
    fontFamily: FONTS.dm_sans[400],
  },
}

// export const toastConfig: ToastConfig = {
//   custom: (props) => <CustomToast {...props} />,
// };
