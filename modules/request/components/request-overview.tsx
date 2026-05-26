import { StyleSheet, View } from 'react-native'
import { useRouter } from 'expo-router'
import { useCallback, useEffect, useMemo, useState, memo } from 'react'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

import Text from '@/components/text'
import { useGetRequestByIdQuery } from '@/hooks/queries/use-requests'
import LocationIcon from '@/assets/icons/location_on.svg'
import AvgIcon from '@/assets/icons/avg_pace.svg'
import Button from '@/components/ui/button'
import RequestOverviewSkeleton from '@/components/placeholder/request-overview-placeholder'
import { useReverseGeoCoding } from '@/hooks/use-reverse-geocode'
import { useRequestStore } from '@/state/request'
import { showToastMessage } from '@/components/notification'

import {
  formatToHHMMSS,
  generateRequestTitle,
  getDuration,
} from '../requests.handler'

const CountdownTimer = memo(({ expiration }: { expiration: string }) => {
  const [timer, setTimer] = useState(() => getDuration(expiration))

  useEffect(() => {
    setTimer(getDuration(expiration))
  }, [expiration])

  useEffect(() => {
    if (timer <= 0) return
    const timeout = setTimeout(() => setTimer((prev) => prev - 1), 1000)
    return () => clearTimeout(timeout)
  }, [timer])

  return (
    <Text size={12} lineHeight={16} color="grey-300">
      Ends in {formatToHHMMSS(timer)}
    </Text>
  )
})

const RequestOverview = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetRequestByIdQuery(id)

  const updateFields = useRequestStore((state) => state.updateRequest)

  const router = useRouter()

  const location = useMemo(
    () => ({
      latitude: +(data?.latitude ?? 0),
      longitude: +(data?.longitude ?? 0),
    }),
    [data?.latitude, data?.longitude]
  )

  const locationDetails = useReverseGeoCoding(location)

  const address = useMemo(
    () =>
      locationDetails?.formattedAddress?.replace(
        new RegExp(`^(${locationDetails.name ?? ''})[.,]?\\s?`),
        ''
      ),
    [locationDetails?.formattedAddress, locationDetails?.name]
  )

  const locationName = useMemo(
    () =>
      data?.location
        ? data.location.slice(0, data.location.indexOf(','))
        : locationDetails?.name,
    [data?.location, locationDetails?.name]
  )

  console.log(data?.id)

  const handleEdit = useCallback(() => {
    if (!data) {
      showToastMessage('Editing is currently unavailable for this request.')
      return
    }
    updateFields({
      location: {
        latitude: data.latitude ?? 0,
        longitude: data.longitude ?? 0,
        formattedAddress: data.location ?? '',
      },
      description: data.description,
      duration: data.duration,
      allow_comment: data.allow_comment,
      reward: data.reward,
    })
    router.replace({ pathname: '/create-request', params: { id } })
  }, [data, updateFields, router, id])

  if (isLoading) return <RequestOverviewSkeleton />

  return (
    <Animated.View style={styles.container} entering={FadeIn} exiting={FadeOut}>
      <View style={styles.detailsContent}>
        <View style={styles.detailsHeader}>
          <Text size={24} lineHeight={28} weight={700} color="black">
            {generateRequestTitle(data?.location ?? data?.description ?? '')}
          </Text>
          <Text size={14} lineHeight={18} weight={600} color="black">
            By {data?.user.name}
          </Text>
        </View>
        <View style={styles.infoWrapper}>
          <LocationIcon width={18} height={18} />
          <View style={styles.infoText}>
            <Text size={14} lineHeight={18} weight={600} color="grey-500">
              {locationName}
            </Text>
            <Text size={12} lineHeight={16} color="grey-300">
              {address?.trim()}
            </Text>
          </View>
        </View>
        {data?.status !== 'completed' && (
          <View style={styles.infoWrapper}>
            <AvgIcon width={18} height={18} />
            <View style={styles.infoText}>
              <Text size={14} lineHeight={18} weight={600} color="grey-500">
                {data?.duration}
              </Text>
              <CountdownTimer expiration={data?.expiration ?? ''} />
            </View>
          </View>
        )}
        {/* <View style={styles.infoWrapper}>
          <ChatIcon width={18} height={18} />
          <View style={styles.infoText}>
            <Text
              size={14}
              lineHeight={18}
              weight={600}
              color="grey-500"
            ></Text>
          </View>
        </View> */}
      </View>
      <View style={styles.descriptionWrapper}>
        <Text size={16} lineHeight={20} weight={600} color="grey-500">
          Description
        </Text>

        <Text size={14} lineHeight={20} color="grey-400">
          {data?.description}
        </Text>
      </View>
      {data?.status === 'pending' && (
        <Button
          label="Edit request details"
          buttonColor="white"
          labelColor="black"
          btnStyle={styles.editButton}
          disabled={!data}
          disabledColor="white"
          onPress={handleEdit}
        />
      )}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 26,
  },
  detailsContent: {
    rowGap: 12,
  },
  detailsHeader: {
    marginBottom: 12,
  },
  infoWrapper: {
    flexDirection: 'row',
    columnGap: 6,
  },
  infoText: {
    flex: 1,
    rowGap: 4,
  },
  descriptionWrapper: {
    flex: 1,
    rowGap: 8,
    marginTop: 40,
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#CDCDCD',
  },
})

export default RequestOverview
