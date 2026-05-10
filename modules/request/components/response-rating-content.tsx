import { View, StyleSheet, Pressable } from 'react-native'
import { useState } from 'react'
import { Star } from 'lucide-react-native'
import { useRouter } from 'expo-router'

import Button from '@/components/ui/button'
import { generateArray } from '@/utils/generator'
import StarIcon from '@/components/icons/star'
import { COLORS } from '@/constants/theme'
import Text from '@/components/text'
import Input from '@/components/ui/input'
import { FONTS } from '@/constants/fonts'
import { actuateFontSize, actuateLineHeight } from '@/utils/normalize'
import { showToastMessage } from '@/components/notification'
import { catchErr } from '@/utils/error-handlers'
import { rateUser } from '@/services/profile'

import { RatingContentProps } from '../requests.types'

const RatingContent = ({
  userId,
  responderName,
  onDismissModal,
}: RatingContentProps) => {
  const [rating, setRating] = useState(generateArray<boolean>(5, false))
  const [experience, setExperience] = useState('')

  const router = useRouter()

  const handleRating = (index: number) => {
    setRating((prevRating) => prevRating.map((rating, idx) => idx <= index))
  }

  const handleFeedbackSubmission = async () => {
    try {
      const userRating = rating.filter((item) => item === true)

      if (!userRating.length) {
        throw Error(`Please rate ${responderName ?? 'the responder'}`)
      }

      await rateUser({ user_id: userId, rating: userRating.length })

      onDismissModal()
      router.replace('/(tabs)/requests')
    } catch (error) {
      showToastMessage(
        catchErr(error).message ?? 'Something went wrong',
        'error'
      )
    }
  }

  const returnHome = () => {
    onDismissModal()
    router.replace('/(tabs)/home')
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.ratingWrapper}>
          {rating.map((value, i) => (
            <Pressable
              key={`star_rating_${i}`}
              style={({ pressed }) => ({ opacity: pressed ? 0.75 : 1 })}
              onPress={() => handleRating(i)}
            >
              <Star
                fill={value ? COLORS.yellow[500] : COLORS.white}
                color={COLORS.yellow[500]}
                width={40}
                height={40}
              />
            </Pressable>
          ))}
        </View>

        {/* <Input
          value={experience}
          label="Tell us a bit more"
          placeholder="Write a review of your experience"
          multiline
          onChangeText={setExperience}
          inputFieldStyle={styles.inputField}
          numberOfLines={5}
          style={styles.input}
          labelStyle={styles.label}
          contentStyle={styles.inputContent}
        /> */}
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          label="Submit feedback"
          onPress={handleFeedbackSubmission}
          disabled={!rating}
        />
        <Pressable
          style={({ pressed }) => ({ opacity: pressed ? 0.75 : 1 })}
          onPress={returnHome}
        >
          <Text
            size={16}
            lineHeight={20}
            color="grey-500"
            align="center"
            weight={600}
            style={styles.link}
          >
            Return home
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    rowGap: 70,
  },
  content: {
    rowGap: 24,
  },
  ratingWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    rowGap: 8,
  },
  label: {
    fontFamily: FONTS.dm_sans[500],
    fontSize: actuateFontSize(14),
    lineHeight: actuateLineHeight(16, 24),
    color: COLORS.grey[500],
  },
  input: {
    height: 120,
  },
  inputContent: { paddingTop: 14 },
  buttonWrapper: {
    rowGap: 16,
  },
  link: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
})

export default RatingContent
