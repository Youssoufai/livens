import { StyleSheet, View } from 'react-native'
import { Star } from 'lucide-react-native'

import Text from '@/components/text'
import { COLORS } from '@/constants/theme'
import Button from '@/components/ui/button'
import ChatReadIcon from '@/assets/icons/chat-read.svg'

import { ResponseCardProps } from '../requests.types'

const ResponseCard = ({
  id,
  responder,
  location,
  starRating,
  requestCompleted,
  isLoading,
  onApprove,
}: ResponseCardProps) => {
  const [firstName] = responder.split(' ')
  const newLocation = location.length > 15 ? `${location}...` : location

  return (
    <View style={styles.container}>
      <View style={styles.detailsContent}>
        <View style={styles.imageWrapper}></View>
        <View style={styles.responderDetails}>
          <Text
            size={16}
            lineHeight={20}
            weight={700}
            color="grey-500"
            style={styles.responder}
          >
            {responder}
          </Text>
          <Text size={12} lineHeight={16} weight={600} color="grey-300">
            {newLocation}
          </Text>
        </View>
        <View>
          <View style={styles.ratingsWrapper}>
            <Text size={12} lineHeight={16} weight={600} color="grey-400">
              {starRating}
            </Text>
            <Star size={14} color={COLORS.grey[400]} />
          </View>
          <View style={styles.ratingsWrapper}>
            <Text size={12} lineHeight={16} weight={600} color="grey-400">
              {requestCompleted} requests
            </Text>
            <ChatReadIcon width={18} height={18} />
          </View>
        </View>
      </View>
      <View>
        <Button
          label={`Approve ${firstName}`}
          loading={isLoading}
          onPress={() => onApprove(id, responder)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 12,
    backgroundColor: COLORS.white,
    rowGap: 8,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: -2,
      height: 3,
    },
    shadowOpacity: 0.01,
    shadowRadius: 8,
    elevation: 3,
  },
  detailsContent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    columnGap: 12,
  },
  imageWrapper: {
    width: 50,
    height: 50,
    borderRadius: 9999,
    backgroundColor: '#D9D9D9',
  },
  responder: {
    textTransform: 'capitalize',
  },
  dot: {},
  responderDetails: {
    rowGap: 4,
    flex: 1,
  },
  ratingsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    columnGap: 4,
  },
})

export default ResponseCard
