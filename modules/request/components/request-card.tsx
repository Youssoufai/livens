import { View, StyleSheet, TouchableOpacity } from 'react-native'

import Text from '@/components/text'
import { COLORS } from '@/constants/theme'
import Button from '@/components/ui/button'

import { RequestCardProps } from '../requests.types'
import { actuateFontSize, actuateLineHeight } from '@/utils/normalize'

const STATUS_COLORS: Record<string, string> = {
  active: COLORS.primary[500],
  // Add more statuses and colors as needed
}

const RequestCard = ({
  id,
  status = 'active',
  title,
  description,
  buttonText = 'View responders',
  onPress = () => {},
}: RequestCardProps) => {
  return (
    <View style={styles.cardContainer}>
      <View
        style={[
          styles.statusBar,
          { backgroundColor: STATUS_COLORS[status] || COLORS.primary[500] },
        ]}
      >
        <Text
          size={11}
          lineHeight={14}
          color="white"
          weight={500}
          style={styles.statusText}
        >
          {status}
        </Text>
      </View>
      <View style={styles.content}>
        <Text size={16} lineHeight={20} weight={600} color="black">
          {title}
        </Text>
        <Text size={14} lineHeight={20} color="grey-300">
          {description}
        </Text>
        <Button
          label={buttonText}
          onPress={() => onPress(id ?? '')}
          btnStyle={styles.button}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  statusBar: {
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  statusText: {
    alignSelf: 'center',
    textTransform: 'capitalize',
    marginTop: 2,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 24,
    rowGap: 6,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#FF3B3B',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    height: 36,
  },
})

export default RequestCard
