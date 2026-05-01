import { StyleSheet, View } from 'react-native'

import { formatCurrency } from '@/utils/format'
import Text from '@/components/text'
import { CircleQuestionMark } from 'lucide-react-native'
import { COLORS } from '@/constants/theme'
import Tooltip from '@/components/tooltip'

const PaymentSummary = ({ rewardAmount = 0, userPayout = 0 }) => {
  return (
    <View style={styles.container}>
      <Text
        size={20}
        lineHeight={24}
        weight={600}
        color="grey-700"
        style={styles.title}
      >
        Payment summary
      </Text>
      <View style={styles.row}>
        <Text size={14} lineHeight={18} color="grey-500" weight={600}>
          Reward amount:
        </Text>
        <Text size={14} lineHeight={18} color="grey-500" weight={600}>
          {formatCurrency(rewardAmount, 0, 'NGN')}
        </Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.row}>
        <Text size={16} lineHeight={20} weight={600} color="grey-500">
          Total:
        </Text>
        <Text size={16} lineHeight={20} weight={600} color="grey-500">
          {formatCurrency(rewardAmount, 0, 'NGN')}
        </Text>
      </View>
      <View style={styles.row}>
        <View style={styles.payoutLabelContainer}>
          <Text
            size={14}
            lineHeight={18}
            color="grey-500"
            style={styles.payoutLabel}
          >
            User payout:
          </Text>
          <Tooltip content="This is the amount that the responder gets after completing the request, as Livelens charges 20% of rewards for service fees. Learn more about our Terms of Service.">
            <CircleQuestionMark size={18} color={COLORS.grey[300]} />
          </Tooltip>
        </View>
        <Text size={15} color="grey-500" weight={500}>
          {formatCurrency(userPayout, 0, 'NGN')}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 16,
    paddingVertical: 24,
    marginBottom: 10,
    marginTop: 16,
  },
  title: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  // label and value styles removed, handled by Text props
  divider: {
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#E0E0E0',
    marginVertical: 8,
  },
  // totalLabel and totalValue styles removed, handled by Text props
  payoutLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  payoutLabel: {
    marginRight: 4,
  },
  infoIcon: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    width: 16,
    height: 16,
    textAlign: 'center',
    lineHeight: 16,
    marginLeft: 2,
  },
  // payoutValue style removed, handled by Text props
})

export default PaymentSummary
