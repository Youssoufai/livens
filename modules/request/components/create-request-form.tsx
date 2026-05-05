import { StyleSheet, View } from 'react-native'
import { useEffect, useState } from 'react'
import Animated from 'react-native-reanimated'

import LocationInput from '@/components/location-input'
import Input from '@/components/ui/input'
import { FONTS } from '@/constants/fonts'
import { actuateFontSize, actuateLineHeight } from '@/utils/normalize'
import { COLORS } from '@/constants/theme'
import Button from '@/components/ui/button'
import ScrollView from '@/components/scrollview'
import { useRequestStore } from '@/state/request'
import StepTransition from '@/components/step-animate-wrapper'

import { animatedComponentDetails } from '../requests.data'

const CreateRequestForm = ({
  direction,
  onNext,
}: {
  direction: Direction
  onNext: VoidFunction
}) => {
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')

  const [initialDirection] = useState(direction)

  const updateRequest = useRequestStore((state) => state.updateRequest)
  const requestDetails = useRequestStore((state) => state.requestDetails)

  useEffect(() => {
    setLocation(requestDetails?.location ?? '')
    setDescription(requestDetails?.description ?? '')
  }, [requestDetails?.location, requestDetails?.description])

  const isValid = location && description.length > 3

  const handleNext = () => {
    console.log(location)

    updateRequest({ location, description })
    onNext()
  }

  return (
    <StepTransition direction={direction}>
      <View style={styles.formField}>
        <LocationInput
          defaultValue={requestDetails?.location}
          label="Specify the location where you need updates from."
          placeholder="Choose location"
          onLocation={setLocation}
        />
        <ScrollView>
          <Input
            value={description}
            defaultValue={requestDetails?.description}
            label="Describe what respondents should focus on when capturing content for you."
            placeholder="E.x: Take a picture of the pool"
            multiline
            onChangeText={setDescription}
            inputFieldStyle={styles.inputField}
            style={styles.input}
            labelStyle={styles.label}
            contentStyle={styles.inputContent}
          />
        </ScrollView>
      </View>
      <View style={styles.buttonWrapper}>
        <Button label="Next" disabled={!isValid} onPress={handleNext} />
      </View>
    </StepTransition>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formField: {
    flex: 1,
    rowGap: 32,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: COLORS.grey[50],
    marginBottom: 12,
  },
  inputField: {
    rowGap: 16,
  },
  label: {
    fontFamily: FONTS.dm_sans[400],
    fontSize: actuateFontSize(16),
    lineHeight: actuateLineHeight(16, 24),
    color: COLORS.grey[500],
  },
  input: {
    height: 120,
  },
  inputContent: { paddingTop: 14 },
  buttonWrapper: {
    paddingHorizontal: 16,
  },
})

export default CreateRequestForm
