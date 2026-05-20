import { Pressable, StyleSheet, View } from 'react-native'

import Text from '@/components/text'
import { COLORS } from '@/constants/theme'
import { globalStyles } from '@/styles/globalStyles'
import { Approved } from '@/services/response/response.types'

type OfferCardStatus = 'pending_approval' | 'not_selected'

interface SentOfferCardProps {
  item: Approved
  status?: OfferCardStatus
  onPress: (id: string) => void
}

const BADGE_CONFIG: Record<OfferCardStatus, { bg: string; color: string; label: string }> = {
  pending_approval: {
    bg: COLORS.yellow[100],
    color: COLORS.yellow[900],
    label: 'Pending approval',
  },
  not_selected: {
    bg: COLORS.grey[50],
    color: COLORS.grey[400],
    label: 'Not selected',
  },
}

function formatPostedDate(dateString: string): string {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.toLocaleString('en-GB', { month: 'short' })
  const year = date.getFullYear()
  return `${day} ${month}, ${year}`
}

const SentOfferCard = ({
  item,
  status = 'pending_approval',
  onPress,
}: SentOfferCardProps) => {
  const badge = BADGE_CONFIG[status]
  const location = item.location ?? 'Unknown location'
  const description = item.description ?? ''
  const postedDate = item.created_at ? formatPostedDate(item.created_at) : null

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && globalStyles.pressedOpacity,
      ]}
      onPress={() => onPress(item.id)}
    >
      <View style={styles.headerRow}>
        <Text size={12} lineHeight={16} color="grey-300">
          You sent an offer
        </Text>
        <View style={[styles.badge, { backgroundColor: badge.bg }]}>
          <Text size={11} lineHeight={14} weight={600} style={{ color: badge.color }}>
            {badge.label}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.content}>
        <Text size={14} lineHeight={18} weight={600} color="grey-700">
          {location}
        </Text>
        <Text size={13} lineHeight={20} color="grey-300" numberOfLines={2}>
          {description}
        </Text>
        {postedDate ? (
          <Text size={12} lineHeight={16} color="grey-300">
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  badge: {
    borderRadius: 20,
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
    rowGap: 6,
  },
})

export default SentOfferCard
