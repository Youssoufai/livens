import { isValidElement, useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { XIcon } from 'lucide-react-native'

import { COLORS } from '@/constants/theme'

import { NoticeProps } from './components.types'
import Text from './text'

const bgColorMap = {
  success: COLORS.green[500],
  error: COLORS.red[500],
  info: COLORS.grey[200],
}

const Notice = ({
  show,
  content,
  type = 'success',
  textStyle,
  containerStyle,
}: NoticeProps) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(!!show)
  }, [])

  if (!visible) return

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: bgColorMap[type] },
        containerStyle,
      ]}
    >
      <View style={styles.content}>
        {isValidElement(content) ? (
          content
        ) : (
          <Text
            size={14}
            lineHeight={18}
            weight={600}
            color="white"
            style={textStyle}
          >
            {content}
          </Text>
        )}
      </View>
      <TouchableOpacity activeOpacity={0.75} onPress={() => setVisible(false)}>
        <XIcon size={28} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    rowGap: 12,
    borderRadius: 4,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  content: {
    flex: 1,
  },
})

export default Notice
