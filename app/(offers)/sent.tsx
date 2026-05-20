import { Pressable, StyleSheet, View } from 'react-native'
import { Image } from 'expo-image'
import { useLocalSearchParams } from 'expo-router'
import { BadgeCheck, Calendar, ClockFading, MapPin } from 'lucide-react-native'

import { ThemedView } from '@/components/themed-view'
import ScrollView from '@/components/scrollview'
import { COLORS } from '@/constants/theme'
import Text from '@/components/text'
import InfoRow from '@/modules/request/components/info-row'
import OffersPreview from '@/modules/request/components/offers-preview'
import Button from '@/components/ui/button'
import { getResolvedAvataUri } from '@/utils/resolver'
import { useGetRequestByIdQuery } from '@/hooks/queries/use-requests'
import { formatCurrency, formatTimeAgo } from '@/utils/format'
import NeedItem from '@/modules/request/components/need-item'
import { useGetOfferListQuery } from '@/hooks/queries/use-response'

import CurrencyAltIcon from '@/assets/icons/currency-alt.svg'
import AvgIcon from '@/assets/icons/avg_pace.svg'
import LocationIcon from '@/assets/icons/location_on.svg'

const SentOfferScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>()

  const { data, isLoading } = useGetRequestByIdQuery(id)
  const { data: offerListData } = useGetOfferListQuery(id)

  const avatarUri = getResolvedAvataUri(data?.user?.name ?? 'U')

  const postedAt = data?.created_at ? formatTimeAgo(data?.created_at) : null

  const descriptionLines = (data?.description ?? '')
    .split(/\n|•|-/)
    .map((s) => s.trim())
    .filter(Boolean)

  const hasMultipleItems = descriptionLines.length > 1

  const reward = +(data?.reward ?? 0)

  const offerCount = isNaN(+(offerListData?.offer_sent ?? 0))
    ? 0
    : +(offerListData?.offer_sent ?? 0)

  return (
    <ThemedView style={styles.container} hasBottomPadding>
      <ScrollView style={styles.content}>
        {/* Title */}
        {/* <Text size={26} lineHeight={32} weight={700} color="grey-800">
          {data?.description?.split('\n')[0] ?? 'Request'}
        </Text> */}

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

        <View style={styles.divider} />

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

        <View style={styles.divider} />

        {/* Meta info */}
        <View style={styles.metaSection}>
          {data?.location ? (
            <InfoRow
              icon={<LocationIcon width={18} height={18} />}
              title="Location"
              text={data?.location}
            />
          ) : null}
          {data?.duration ? (
            <InfoRow
              icon={<AvgIcon width={18} height={18} />}
              title="Duration"
              text={data?.duration}
            />
          ) : null}
          {postedAt ? (
            <InfoRow
              icon={<Calendar size={18} color={COLORS.grey[400]} />}
              title={`Posted ${postedAt}`}
            />
          ) : null}
        </View>
        <OffersPreview hasUser count={offerCount} />
      </ScrollView>

      <View style={styles.footer}>
        <Button label="Offer sent" disabled onPress={() => {}} />
        <Pressable style={styles.withdrawButton}>
          <Text
            size={14}
            lineHeight={16}
            color="grey-500"
            weight={600}
            style={styles.withdrawBtnText}
          >
            Withdraw offer
          </Text>
        </Pressable>
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
  metaSection: { flex: 1, rowGap: 12 },

  footer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: COLORS.grey[50],
    backgroundColor: COLORS.white,
    rowGap: 4,
  },
  withdrawButton: {
    paddingVertical: 6,
  },
  withdrawBtnText: {
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
})

export default SentOfferScreen
