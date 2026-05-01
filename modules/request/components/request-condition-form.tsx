import { StyleSheet, View } from 'react-native'
import { useState } from 'react'
import Animated from 'react-native-reanimated'

import SelectInput from '@/components/select-input'
import Button from '@/components/ui/button'
import { COLORS } from '@/constants/theme'
import { useRequestStore } from '@/state/request'

import { animatedComponentDetails, REQUEST_DURATION } from '../requests.data'
import StepTransition from '@/components/step-animate-wrapper'

const RequestConditionForm = ({
  direction,
  onNext,
}: {
  direction: Direction
  onNext: VoidFunction
}) => {
  const [option, setOption] = useState('')

  const [initialDirection] = useState(direction)

  const updateRequest = useRequestStore((state) => state.updateRequest)
  const duration = useRequestStore((state) => state.requestDetails?.duration)

  const handleNext = () => {
    updateRequest({ duration: option, allow_comment: true })
    onNext()
  }

  return (
    <StepTransition direction={direction}>
      <View style={styles.formField}>
        <SelectInput
          defaultValue={duration ?? ''}
          label="Choose a time duration for which the request must be completed."
          placeholder="Select duration"
          onChangeText={setOption}
          options={REQUEST_DURATION}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          label="Next"
          disabled={!option && !duration}
          onPress={handleNext}
        />
      </View>
    </StepTransition>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  formField: {
    flex: 1,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: COLORS.grey[50],
    marginBottom: 12,
  },
  buttonWrapper: {
    paddingHorizontal: 16,
  },
})

export default RequestConditionForm
