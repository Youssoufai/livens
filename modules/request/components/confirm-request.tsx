import { useState } from 'react'
import { StyleSheet, Text as RNText, View } from 'react-native'
import { Link, useRouter } from 'expo-router'
import { Divider } from 'react-native-paper'

import Button from '@/components/ui/button'
import Text from '@/components/text'
import { COLORS } from '@/constants/theme'
import { FONTS } from '@/constants/fonts'
import { actuateFontSize, actuateLineHeight } from '@/utils/normalize'
import { useRequestStore } from '@/state/request'
import { useCreateRequestMutation } from '@/hooks/mutations/use-request'
import ScrollView from '@/components/scrollview'
import { formatCurrency } from '@/utils/format'
import Notice from '@/components/notice'
import StepTransition from '@/components/step-animate-wrapper'
import { showToastMessage } from '@/components/notification'
import { catchErr, handleErrorInstances } from '@/utils/error-handlers'

import PaymentMethod from './payment-method'
import PaymentSummary from './payment-summary'

const SummaryItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.summaryItem}>
    <Text size={14} lineHeight={18} weight={600} color="grey-500">
      {label}
    </Text>
    <Text size={16} lineHeight={24} color="grey-500">
      {value}
    </Text>
  </View>
)

const RequestConfirmForm = ({
  direction,
  onSuccessModal,
}: {
  direction: Direction
  onSuccessModal: VoidFunction
}) => {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState('')

  const resetRequest = useRequestStore((state) => state.resetRequest)
  const request = useRequestStore((state) => state.requestDetails)

  const {
    mutateAsync: createRequest,
    isPending,
    error,
  } = useCreateRequestMutation()

  const walletAmount = 0

  const rewardLabel =
    request?.reward === 0
      ? 'No reward'
      : formatCurrency(+(request?.reward ?? 0), 2, 'NGN')

  const formattedPrice =
    request?.reward === 0
      ? 'Free'
      : formatCurrency(+(request?.reward ?? 0), 2, 'NGN')

  const userPayout = request?.reward
    ? Math.round((+request.reward - +request.reward * 0.2) * 100) / 100
    : 0

  const handleSubmit = async () => {
    try {
      await createRequest({
        location: request?.location ?? '',
        description: request?.description ?? '',
        duration: request?.duration ?? '',
        allow_comment: request?.allow_comment ?? true,
        reward: (request?.reward ?? 0).toString(),
      })

      resetRequest()
      onSuccessModal()
    } catch (error) {
      showToastMessage(catchErr(error).message ?? '', 'error')
    }
  }

  const isButtonDisabled =
    (+request?.reward! > 0 && !paymentMethod) ||
    walletAmount < +request?.reward!

  return (
    <StepTransition direction={direction}>
      <ScrollView style={styles.scrollContent}>
        <View style={styles.summaryCard}>
          <Text
            size={20}
            lineHeight={24}
            weight={600}
            color="grey-500"
            style={styles.sectionTitle}
          >
            Request summary
          </Text>
          <SummaryItem label="Location" value={request?.location || '—'} />
          <SummaryItem
            label="Description"
            value={request?.description || '—'}
          />
          <SummaryItem label="Duration" value={request?.duration || '—'} />
          {request?.reward === 0 && <SummaryItem label="Reward" value="Free" />}

          <Notice
            show={walletAmount < +request?.reward!}
            content={
              <Text size={14} lineHeight={18} weight={600} color="white">
                Payment method failed due to insufficient funds.{' '}
                <Link href={'/'} disabled style={styles.fundLink}>
                  Fund wallet now
                </Link>
              </Text>
            }
            type="error"
          />
        </View>

        {request?.reward !== 0 && (
          <>
            <Divider style={styles.divider} />
            <View style={styles.paymentDetailsSection}>
              <Text
                size={20}
                lineHeight={24}
                weight={600}
                color="grey-500"
                style={styles.sectionTitle}
              >
                Payment details
              </Text>
              <PaymentMethod
                amount={walletAmount}
                value={paymentMethod}
                onValueChange={setPaymentMethod}
              />
            </View>
          </>
        )}

        <Divider style={styles.divider} />

        <View>
          <View style={styles.policySection}>
            <Text
              size={15}
              weight={600}
              color="grey-800"
              style={styles.sectionTitle}
            >
              Deposit & refund policy
            </Text>
            <RNText style={styles.policyText}>
              {'Deposited funds will be secured with your chosen '}
              <RNText style={styles.policyLink}>transaction gateway</RNText>
              {
                ' and will only be refunded upon cancellation of this request. Reach out to us through our '
              }
              <RNText style={styles.policyLink}>contact handles</RNText>
              {' in regards to any financial issues.'}
            </RNText>
          </View>
          {+request?.reward! > 0 && (
            <PaymentSummary
              rewardAmount={+(request?.reward ?? 0)}
              userPayout={userPayout}
            />
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text size={18} weight={700} color="grey-800">
            {formattedPrice}
          </Text>
          <Text size={12} color="grey-400">
            1x request
          </Text>
        </View>
        <View style={styles.submitBtnWrapper}>
          <Button
            label="Post request"
            onPress={handleSubmit}
            loading={isPending}
            disabled={isPending || isButtonDisabled}
          />
        </View>
      </View>
    </StepTransition>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    paddingBottom: 8,
    rowGap: 30,
  },
  summaryCard: {
    paddingHorizontal: 16,
    rowGap: 14,
  },
  sectionTitle: { marginBottom: 2 },
  summaryItem: { rowGap: 2 },
  fundLink: {
    textDecorationLine: 'underline',
  },
  paymentDetailsSection: {
    rowGap: 20,
    paddingHorizontal: 16,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.grey[50],
  },
  policySection: {
    paddingHorizontal: 16,
    rowGap: 10,
  },
  policyText: {
    fontFamily: FONTS.dm_sans[400],
    fontSize: actuateFontSize(14),
    lineHeight: actuateLineHeight(14, 22),
    color: COLORS.grey[500],
  },
  policyLink: {
    textDecorationLine: 'underline',
    color: COLORS.grey[700],
    fontFamily: FONTS.dm_sans[600],
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: 12,
    paddingTop: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderColor: COLORS.grey[50],
  },
  submitBtnWrapper: { flex: 1 },
})

export default RequestConfirmForm
