import { StyleSheet, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useMemo, useState } from 'react'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

import Text from '@/components/text'
import { useGetRequestByIdQuery } from '@/hooks/queries/use-requests'
import LocationIcon from '@/assets/icons/location_on.svg'
import ChatIcon from '@/assets/icons/chat.svg'
import AvgIcon from '@/assets/icons/avg_pace.svg'
import { SkeletonLoader } from '@/components/skeleton-loader'
import Button from '@/components/ui/button'

import { formatToHHMMSS, getDuration } from '../requests.handler'

const RequestOverview = ({ id }: { id: string }) => {
  const [timer, setTimer] = useState(0)

  const { data, isLoading } = useGetRequestByIdQuery(id)

  const duration = useMemo(
    () => getDuration(data?.expiration ?? ''),
    [data?.expiration]
  )

  useEffect(() => {
    setTimer(duration)
  }, [duration])

  useEffect(() => {
    if (timer > 0) {
      let timeout = setTimeout(() => setTimer((prevVal) => prevVal - 1), 1000)

      return () => clearTimeout(timeout)
    }
  }, [timer])

  const handleEdit = () => {
    console.log('here')
  }

  return (
    <Animated.View style={styles.container} entering={FadeIn} exiting={FadeOut}>
      <View>
        <View style={styles.detailsHeader}>
          <Text size={24} lineHeight={28} weight={700} color="black">
            {data?.location}
          </Text>
          <Text size={14} lineHeight={18} weight={600} color="black">
            {''}
          </Text>
        </View>
        <View style={styles.infoWrapper}>
          <LocationIcon width={18} height={18} />
          <View style={styles.infoText}>
            <Text size={14} lineHeight={18} weight={600} color="grey-500">
              {data?.location}
            </Text>
            <Text size={12} lineHeight={16} color="grey-300">
              {''}
            </Text>
          </View>
        </View>
        <View style={styles.infoWrapper}>
          <AvgIcon width={18} height={18} />
          <View style={styles.infoText}>
            <Text size={14} lineHeight={18} weight={600} color="grey-500">
              {data?.duration}
            </Text>
            <Text size={12} lineHeight={16} color="grey-300">
              Ends in {formatToHHMMSS(timer)}
            </Text>
          </View>
        </View>
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
        {isLoading ? (
          <SkeletonLoader height={14} style={styles.descriptionLoader} />
        ) : (
          <Text size={14} lineHeight={20} color="grey-400">
            {data?.description}
          </Text>
        )}
      </View>
      <Button
        label="Edit request details"
        buttonColor="white"
        labelColor="black"
        btnStyle={styles.editButton}
        disabled={!data}
        disabledColor="white"
        onPress={handleEdit}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 26,
  },
  detailsHeader: {
    marginBottom: 8,
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
  descriptionLoader: {
    width: '100%',
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#CDCDCD',
  },
})

export default RequestOverview
