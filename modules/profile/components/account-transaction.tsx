import { Pressable, StyleSheet, View } from 'react-native'
import { ChevronRight } from 'lucide-react-native'
import { useRouter } from 'expo-router'

import Text from '@/components/text'
import { useBoundStore } from '@/state'
import { formatCurrency } from '@/utils/format'
import Button from '@/components/ui/button'
import { COLORS } from '@/constants/theme'

const AccountTransaction = () => {
  const balance = useBoundStore((state) => state.user?.balance)

  const router = useRouter()

  return (
    <View style={styles.container}>
      <View style={styles.topContent}>
        <View style={styles.balanceWrapper}>
          <Text size={14} lineHeight={20} color="grey-400">
            Balance:
          </Text>
          <Text size={24} lineHeight={28} weight={600} color="grey-800">
            {formatCurrency(
              balance && !isNaN(+(balance ?? 0)) ? +balance : 0,
              2,
              'NGN'
            )}
          </Text>
        </View>
        <Pressable
          style={styles.transaction}
          onPress={() => router.push('/(profile)/transaction-history')}
        >
          <Text size={14} lineHeight={18} color="grey-800" weight={600}>
            Transaction history
          </Text>
          <ChevronRight />
        </Pressable>
      </View>
      <View style={styles.bottomContent}>
        <Button
          label="Withdraw"
          onPress={() => router.push('/(profile)/withdraw' as any)}
          btnStyle={styles.button}
        />
        <Button
          label="Fund wallet"
          labelColor="black"
          buttonColor="white"
          onPress={() =>
            router.push({
              pathname: '/(profile)/fund-wallet' as any,
              params: { prevScreen: 'profile' },
            })
          }
          btnStyle={{ ...styles.button, ...styles.fundButton }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingBottom: 16,
    paddingHorizontal: 16,
    rowGap: 20,
    borderColor: COLORS.grey[50],
    borderWidth: 1,
    borderRadius: 8,
  },
  topContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  balanceWrapper: {
    flex: 1,
    rowGap: 4,
  },
  transaction: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },
  bottomContent: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
  },
  button: {
    height: 36,
    flex: 1,
  },
  fundButton: {
    borderWidth: 1,
    borderColor: '#CDCDCD',
  },
})

export default AccountTransaction
