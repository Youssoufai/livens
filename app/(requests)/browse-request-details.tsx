import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import {
  CheckCircle,
  ClockFading,
  Calendar,
  BadgeCheck,
  MapPin,
} from 'lucide-react-native'

import Button from '@/components/ui/button'
import Text from '@/components/text'
import { COLORS } from '@/constants/theme'
import { formatCurrency, formatTimeAgo } from '@/utils/format'
import { useGetRequestByIdQuery } from '@/hooks/queries/use-requests'
import { ThemedView } from '@/components/themed-view'
import CurrencyAltIcon from '@/assets/icons/currency-alt.svg'
import InfoRow from '@/modules/request/components/info-row'
import OffersPreview from '@/modules/request/components/offers-preview'
import ScrollView from '@/components/scrollview'
import { getResolvedAvataUri } from '@/utils/resolver'
import { useGetOfferListQuery } from '@/hooks/queries/use-response'
import { useRespondToRequest } from '@/hooks/mutations/use-response'
import { showToastMessage } from '@/components/notification'
import { catchErr } from '@/utils/error-handlers'
import ScreenLoader from '@/components/screen-loader'
import NeedItem from '@/modules/request/components/need-item'

export default function AcceptRequestScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()

  const [isRedirecting, setIsRedirecting] = useState(false)

  const { data, isLoading } = useGetRequestByIdQuery(id)
  const { data: offerListData } = useGetOfferListQuery(id)

  const { mutateAsync: respondToRequest, isPending } = useRespondToRequest(id)

  useEffect(() => {
    if (isRedirecting) {
      const timeout = setTimeout(() => {
        setIsRedirecting(false)
        router.replace({ pathname: '/(offers)/sent', params: { id } })
      }, 2000)

      return () => clearTimeout(timeout)
    }
  }, [isRedirecting, id])

  const offerCount = isNaN(+(offerListData?.offer_sent ?? 0))
    ? 0
    : +(offerListData?.offer_sent ?? 0)

  const offerHelp = async () => {
    try {
      await respondToRequest()

      setIsRedirecting(true)
    } catch (error) {
      showToastMessage(
        catchErr(error).message ?? 'Something went wrong',
        'error'
      )
    }
  }

  const avatarUri = getResolvedAvataUri(data?.user?.name ?? 'U')

  const postedAt = data?.created_at ? formatTimeAgo(data?.created_at) : null

  // Parse description lines as "what's needed" items if multi-line, else show as paragraph
  const descriptionLines = (data?.description ?? '')
    .split(/\n|•|-/)
    .map((s) => s.trim())
    .filter(Boolean)

  const hasMultipleItems = descriptionLines.length > 1

  const reward = +(data?.reward ?? 0)

  return (
    <>
      <ThemedView style={styles.container}>
        <ScrollView style={styles.content}>
          {/* Title */}
          {/* <Text size={26} lineHeight={32} weight={700} color="grey-800">
          {data?.description?.split('\n')[0] ?? 'Request'}
        </Text> */}

          {/* Reward badge */}
          <View style={styles.rewardRow}>
            <CurrencyAltIcon />
            <Text size={14} lineHeight={18} weight={700} color="grey-500">
              {reward > 0 ? formatCurrency(reward, 0, 'NGN') : 'Free'}
            </Text>
          </View>

          {/* User info */}
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

          {/* What's needed */}
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
                icon={<MapPin size={24} color={COLORS.grey[400]} />}
                title="Location"
                text={data?.location}
              />
            ) : null}
            {data?.duration ? (
              <InfoRow
                icon={
                  <ClockFading
                    size={24}
                    color={COLORS.grey[400]}
                    style={styles.fadingClockIcon}
                  />
                }
                title="Duration"
                text={data?.duration}
              />
            ) : null}
            {postedAt ? (
              <InfoRow
                icon={<Calendar size={24} color={COLORS.grey[400]} />}
                title={`Posted ${postedAt}`}
              />
            ) : null}
          </View>
          {/* ADD THE OFFERS COUNT */}
          <OffersPreview count={offerCount} />
        </ScrollView>

        <View style={styles.footer}>
          <Button
            label="Offer to help"
            onPress={offerHelp}
            loading={isPending}
          />
        </View>
      </ThemedView>
      <ScreenLoader isLoading={isRedirecting} content="Redirecting..." />
    </>
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

  metaSection: { flex: 1, rowGap: 12 },

  footer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: COLORS.grey[50],
    backgroundColor: COLORS.white,
  },
})
