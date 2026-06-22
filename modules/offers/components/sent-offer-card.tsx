import { Pressable, StyleSheet, View } from 'react-native'

import Text from '@/components/text'
import { COLORS } from '@/constants/theme'
import { globalStyles } from '@/styles/globalStyles'
import { formatDate } from '@/utils/format'
import { generateRequestTitle } from '@/modules/request/requests.handler'
import LineBlock from '@/components/line-block'
import { LINE_BLOCK_SPACING } from '@/constants'

import { SentOfferCardProps } from '../offers.types'
import { BADGE_CONFIG } from '../offer.data'

const SentOfferCard = ({
  id,
  description,
  status = 'pending',
  timestamp,
  onPress,
}: SentOfferCardProps) => {
  const badge = BADGE_CONFIG[status]

  const postedDate = timestamp
    ? formatDate(timestamp, 'en-US', '2-digit', 'short')
    : null

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && globalStyles.pressedOpacity,
      ]}
      // onPress={() => onPress(id)}
    >
      <View
        style={[
          styles.headerRow,
          {
            backgroundColor:
              status === 'rejected' || status === 'completed'
                ? badge?.headerBg
                : undefined,
          },
        ]}
      >
        <Text size={14} lineHeight={20} color="grey-400">
          You sent an offer
        </Text>
        <View style={[styles.badge, { backgroundColor: badge?.bg }]}>
          <Text
            size={11}
            lineHeight={14}
            weight={600}
            style={{ color: badge?.color }}
          >
            {badge?.label}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <LineBlock />
        <Text size={14} lineHeight={18} weight={600} color="grey-500">
          {generateRequestTitle(description)}
        </Text>
        <Text size={14} lineHeight={20} color="grey-300">
          {description}
        </Text>
        {postedDate ? (
          <Text size={11} lineHeight={14} color="grey-300">
            Posted: {postedDate}
          </Text>
        ) : null}
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
  },
  headerRow: {
    borderWidth: 1,
    borderColor: COLORS.grey[100],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.grey[50],
    borderRadius: 8,
  },
  badge: {
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.grey[50],
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingLeft: LINE_BLOCK_SPACING,
    rowGap: 6,
    position: 'relative',
  },

  horizontalLine: {
    width: '100%',
    height: 2,
    backgroundColor: COLORS.grey[100],
    borderBottomLeftRadius: 50,
  },
  verticalLine: {
    width: 2,
    height: '100%',
    backgroundColor: COLORS.grey[100],
    borderBottomLeftRadius: 50,
  },
})

export default SentOfferCard
