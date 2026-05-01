import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import * as RadioGroupPrimitive from '@rn-primitives/radio-group'
import Animated from 'react-native-reanimated'

import Button from '@/components/ui/button'
import Checkbox from '@/components/check-box'
import Input from '@/components/ui/input'
import { COLORS } from '@/constants/theme'
import { useRequestStore } from '@/state/request'
import KeyboardScrollView from '@/components/keyboard-scrollview'

import RewardCard from './reward-option'
import { animatedComponentDetails, REWARD_OPTIONS } from '../requests.data'
import StepTransition from '@/components/step-animate-wrapper'

const RequestReward = ({
  direction,
  onNext,
}: {
  direction: Direction
  onNext: VoidFunction
}) => {
  const [selected, setSelected] = useState<string>('')
  const [customAmount, setCustomAmount] = useState('')
  const [noReward, setNoReward] = useState(false)

  const updateRequest = useRequestStore((state) => state.updateRequest)
  const reward = useRequestStore((state) => state.requestDetails?.reward)

  useEffect(() => {
    if (typeof reward === 'undefined') return

    if (reward === 0) {
      setNoReward(true)
      return
    }

    const preformReward = REWARD_OPTIONS.find((option) => +option.id === reward)

    if (preformReward) {
      setSelected(preformReward.id)
    } else {
      setSelected(REWARD_OPTIONS[2].id)
      setCustomAmount(isNaN(+reward) ? '0' : (+reward).toFixed(1))
    }
  }, [reward])

  const canProceed =
    noReward ||
    (selected !== '' && (selected !== 'custom' || Number(customAmount) >= 500))

  const handleNext = () => {
    if (noReward) {
      updateRequest({ reward: 0 })
    } else if (selected === 'custom') {
      updateRequest({ reward: Number(customAmount) })
    } else {
      updateRequest({ reward: Number(selected) })
    }
    onNext()
  }

  const handleRewardSelection = (value: string) => {
    setSelected(value)
    setNoReward(false)
  }

  const handleNoReward = (checked?: boolean) => {
    setNoReward(!!checked)
    if (checked) {
      setSelected('')
      setCustomAmount('')
    }
  }

  return (
    <StepTransition direction={direction}>
      <KeyboardScrollView>
        <View style={styles.formField}>
          <RadioGroupPrimitive.Root
            value={selected}
            onValueChange={handleRewardSelection}
            style={styles.cardsWrapper}
          >
            {REWARD_OPTIONS.map((option) => {
              const isSelected = selected === option.id
              return (
                <RewardCard
                  key={option.id}
                  id={option.id}
                  title={option.amount}
                  description={option.description}
                  isPopular={option.popular}
                  isSelected={selected === option.id}
                  disabled={noReward}
                />
              )
            })}
          </RadioGroupPrimitive.Root>

          {selected === 'custom' && (
            <Input
              keyboardType="numeric"
              label="Enter amount"
              placeholder="0.0"
              value={customAmount}
              onChangeText={setCustomAmount}
            />
          )}

          <Checkbox
            label="Post this request without a reward"
            checked={noReward}
            onPress={handleNoReward}
          />
        </View>

        <View style={styles.buttonWrapper}>
          <Button label="Next" disabled={!canProceed} onPress={handleNext} />
        </View>
      </KeyboardScrollView>
    </StepTransition>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  formField: {
    paddingTop: 16,
    flex: 1,
    rowGap: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: COLORS.grey[50],
    marginBottom: 12,
  },
  cardsWrapper: {
    rowGap: 16,
  },
  buttonWrapper: {
    paddingHorizontal: 16,
  },
})

export default RequestReward
