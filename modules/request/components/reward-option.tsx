import { Pressable, StyleSheet, View } from 'react-native'
import * as RadioGroupPrimitive from '@rn-primitives/radio-group'

import Text from '@/components/text'
import { COLORS } from '@/constants/theme'

import { RewardOptionProps } from '../requests.types'

const BADGE_HEIGHT = 24

const RewardCard = ({
  id,
  isPopular,
  title,
  description,
  isSelected,
  disabled,
  onSelect,
}: RewardOptionProps) => {
  return (
    <RadioGroupPrimitive.Item
      asChild
      value={id}
      disabled={disabled}
      style={disabled ? styles.disabled : {}}
    >
      <Pressable
        key={id}
        style={[styles.card, isSelected && styles.cardSelected]}
        onPress={() => {
          onSelect?.(id)
          // setNoReward(false)
        }}
        disabled={disabled}
      >
        {isPopular && (
          <View style={styles.badge}>
            <Text size={11} weight={500} color="white">
              Most popular
            </Text>
          </View>
        )}
        <View style={styles.cardRow}>
          <View style={styles.cardText}>
            <Text size={16} weight={600} color="grey-800">
              {title}
            </Text>
            <Text size={13} lineHeight={20} color="grey-400">
              {description}
            </Text>
          </View>
          <View style={[styles.radio, isSelected && styles.radioSelected]}>
            <RadioGroupPrimitive.Indicator style={styles.indicator} />
          </View>
        </View>
      </Pressable>
    </RadioGroupPrimitive.Item>
  )
}

export default RewardCard

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: COLORS.grey[100],
    borderRadius: 10,
    padding: 16,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -(BADGE_HEIGHT / 2),
    right: 20,
    backgroundColor: COLORS.primary[500],
    paddingHorizontal: 10,
    height: BADGE_HEIGHT,
    justifyContent: 'center',
    borderRadius: 8,
  },
  cardSelected: {
    borderColor: COLORS.primary[500],
    backgroundColor: COLORS.primary[50],
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    rowGap: 4,
  },
  cardText: { flex: 1, paddingRight: 32 },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 9999,
    borderWidth: 1.5,
    borderColor: COLORS.grey[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderWidth: 0,
  },
  indicator: {
    width: '100%',
    height: '100%',
    borderRadius: 9999,
    borderWidth: 4,
    borderColor: COLORS.primary[500],
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary[500],
  },
  disabled: {
    opacity: 0.5,
  },
})
