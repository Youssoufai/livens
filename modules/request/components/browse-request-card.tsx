import { Image, Pressable, StyleSheet, View } from 'react-native'
import { MapPin } from 'lucide-react-native'

import Text from '@/components/text'
import { COLORS } from '@/constants/theme'
import { globalStyles } from '@/styles/globalStyles'
import { formatDistance, getDistanceKm, formatCurrency } from '@/utils/format'
import { getResolvedAvataUri } from '@/utils/resolver'

import { BrowseRequestCardProps } from '../requests.types'
import { getTimeLeftFromDuration } from '../requests.handler'

const BrowseRequestCard = ({
  id,
  name,
  description,
  reward,
  profilePhoto,
  duration,
  location,
  latitude,
  longitude,
  createdAt,
  userLat,
  userLon,
  requesterLocation,
  onPress,
}: BrowseRequestCardProps) => {
  const avatarUri =
    profilePhoto ||
    getResolvedAvataUri(name, {
      background: COLORS.primary[50],
      text: COLORS.primary[400],
    })

  const distanceStr =
    userLat && userLon && latitude && longitude
      ? formatDistance(getDistanceKm(userLat, userLon, +latitude, +longitude))
      : null

  const timeLeft =
    duration && createdAt ? getTimeLeftFromDuration(duration, createdAt) : null

  const requestReward = isNaN(+reward) ? 0 : +reward
  const addressParts = requesterLocation.split(',')
  const requesterAddress = addressParts.slice(-2).join(',').trim()

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && globalStyles.pressedOpacity,
      ]}
      onPress={() => onPress(id)}
    >
      <View style={styles.titleRow}>
        <View style={styles.titleWrapper}>
          <Text size={16} lineHeight={22} weight={600} color="grey-800">
            {description?.split('\n')[0] ?? 'Request'}
          </Text>
        </View>
        <View style={styles.rewardBadge}>
          <Text size={12} lineHeight={16} weight={600} color="white">
            {requestReward > 0
              ? formatCurrency(requestReward, 0, 'NGN')
              : 'Free'}
          </Text>
        </View>
      </View>

      {location ? (
        <View style={styles.locationRow}>
          <MapPin size={12} color={COLORS.grey[300]} />
          <Text
            size={12}
            lineHeight={16}
            color="grey-300"
            style={styles.locationText}
          >
            {location}
          </Text>
        </View>
      ) : null}

      <View style={styles.footer}>
        <View style={styles.userRow}>
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
          <View style={styles.requesterDetails}>
            <Text size={14} lineHeight={18} weight={600} color="grey-500">
              {name ?? 'Unknown'}
            </Text>
            {/* <Text size={12} lineHeight={16} weight={500} color="grey-300">
              {requesterAddress}
            </Text> */}
          </View>
        </View>
        {timeLeft ? (
          <Text size={12} lineHeight={16} weight={500} color="grey-300">
            {timeLeft}
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
    padding: 16,
    rowGap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    columnGap: 12,
  },
  titleWrapper: {
    flex: 1,
  },
  rewardBadge: {
    backgroundColor: COLORS.green[500],
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },
  locationText: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
    columnGap: 8,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    flex: 1,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 9999,
    backgroundColor: COLORS.grey[50],
  },
  requesterDetails: {
    flex: 1,
    // rowGap: 4,
  },
})

export default BrowseRequestCard
