import { router, useLocalSearchParams } from 'expo-router'
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CheckCircle, BadgeCheck } from 'lucide-react-native'
import { Divider } from 'react-native-paper'

import Button from '@/components/ui/button'
import Text from '@/components/text'
import { COLORS } from '@/constants/theme'
import { formatCurrency, formatTimeAgo } from '@/utils/format'
import { useGetRequestByIdQuery } from '@/hooks/queries/use-requests'
import { ThemedView } from '@/components/themed-view'
import CurrencyAltIcon from '@/assets/icons/currency-alt.svg'
import ScrollView from '@/components/scrollview'
import { getResolvedAvataUri } from '@/utils/resolver'
import {
  generateRequestTitle,
  getTimeLeftFromDuration,
} from '@/modules/request/requests.handler'
import DetailsItem from '@/modules/request/components/details-item'
import NeedItem from '@/modules/request/components/need-item'

import AvgIcon from '@/assets/icons/avg_pace.svg'
import LocationIcon from '@/assets/icons/location_on.svg'
import OngoingRequestCardSkeleton from '@/components/placeholder/ongoing-request-card-skeleton'
import BrowseRequestDetailsSkeleton from '@/components/placeholder/browse-request-details-skeleton'

export default function OutgoingRequestScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()

  const { data, isLoading } = useGetRequestByIdQuery(id)

  const start = async () => {
    router.push({
      pathname: '/(requests)/capture-process',
      params: { request_id: id },
    })
  }

  if (isLoading) {
    return <BrowseRequestDetailsSkeleton />
  }

  const avatarUri = getResolvedAvataUri(data?.user?.name ?? 'U')

  const postedAt = data?.created_at ? formatTimeAgo(data?.created_at) : null

  const descriptionLines = (data?.description ?? '')
    .split(/\n|•|-/)
    .map((s) => s.trim())
    .filter(Boolean)

  const hasMultipleItems = descriptionLines.length > 1

  const reward = +(data?.reward ?? 0)

  const timeLeft = data?.duration
    ? getTimeLeftFromDuration(data?.duration, data?.created_at)
    : ''

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.content}>
        <Text size={26} lineHeight={32} weight={700} color="grey-800">
          {generateRequestTitle(data?.description ?? '')}
        </Text>

        {/* Reward badge */}
        <View style={styles.rewardRow}>
          <CurrencyAltIcon />
          <Text size={14} lineHeight={18} weight={700} color="grey-500">
            {reward > 0 ? formatCurrency(reward, 0, 'NGN') : 'Free'}
          </Text>
        </View>

        <View style={styles.userRow}>
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
          <View style={styles.userMeta}>
            <View style={styles.nameRow}>
              <Text size={14} lineHeight={18} weight={600} color="grey-700">
                {data?.user?.name ?? 'Unknown'}
              </Text>
              <View style={styles.verifiedBadge}>
                <BadgeCheck
                  size={14}
                  strokeWidth={2.5}
                  color={COLORS.blue[500]}
                />
                <Text
                  size={12}
                  lineHeight={16}
                  weight={600}
                  style={{ color: COLORS.blue[500] }}
                >
                  Verified
                </Text>
              </View>
            </View>
            {postedAt ? (
              <Text size={12} lineHeight={16} color="grey-300">
                Posted {postedAt}
              </Text>
            ) : null}
          </View>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.metaSection}>
          {data?.location ? (
            <DetailsItem
              icon={<LocationIcon width={18} height={18} />}
              label="Request location"
              value={data.location}
            />
          ) : null}
          {timeLeft ? (
            <DetailsItem
              icon={<AvgIcon width={18} height={18} />}
              label={`Duration (${data?.duration ?? ''})`}
              value={
                !timeLeft.toLowerCase().includes('expired')
                  ? `${timeLeft} left`
                  : timeLeft
              }
            />
          ) : null}
        </View>

        <Divider style={styles.divider} />

        <View style={styles.section}>
          <Text size={15} lineHeight={20} weight={600} color="grey-800">
            Description of what's needed
          </Text>
          {hasMultipleItems ? (
            <View style={styles.needList}>
              {descriptionLines.map((line, i) => (
                <NeedItem key={i} text={line} />
              ))}
            </View>
          ) : (
            <Text size={14} lineHeight={22} color="grey-500">
              {data?.description}
            </Text>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button label="Start capture" onPress={start} />
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
  },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  content: {
    paddingBottom: 24,
    rowGap: 16,
  },
  rewardRow: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.grey[50],
  },
  userMeta: { rowGap: 2 },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 2,
  },
  fadingClockIcon: {},
  divider: {
    height: 1,
    backgroundColor: COLORS.grey[50],
  },
  section: { rowGap: 10 },
  needList: { rowGap: 8 },
  needItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    columnGap: 8,
  },
  metaSection: { rowGap: 12 },

  footer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: COLORS.grey[50],
    backgroundColor: COLORS.white,
  },
})
