import { StyleSheet, View } from 'react-native'
import { Clock } from 'lucide-react-native'

import Text from '@/components/text'
import { ThemedView } from '@/components/themed-view'
import ScrollView from '@/components/scrollview'
import { COLORS } from '@/constants/theme'

type TransactionStatus = 'Processing' | 'Failed' | 'Successful'

type Transaction = {
  id: string
  title: string
  amount: string
  date: string
  status: TransactionStatus
}

const STATUS_COLORS: Record<TransactionStatus, string> = {
  Processing: COLORS.yellow[500],
  Failed: COLORS.red[500],
  Successful: COLORS.green[500],
}

const transactions: Transaction[] = []

const StatusBadge = ({ status }: { status: TransactionStatus }) => (
  <View style={[styles.badge, { backgroundColor: STATUS_COLORS[status] }]}>
    <Text size={11} weight={600} color="white">
      {status}
    </Text>
  </View>
)

const TransactionCard = ({ item }: { item: Transaction }) => (
  <View style={styles.card}>
    <View style={styles.cardRow}>
      <Text size={12} lineHeight={16} weight={600} color="grey-500" style={styles.cardTitle}>
        {item.title}
      </Text>
      <StatusBadge status={item.status} />
    </View>
    <Text size={14} lineHeight={20} color="grey-700">
      {item.amount}
    </Text>
    <Text size={12} lineHeight={16} color="grey-300">
      {item.date}
    </Text>
  </View>
)

export default function TransactionHistory() {
  const hasTransactions = transactions.length > 0

  return (
    <ThemedView style={styles.container}>
      {hasTransactions ? (
        <ScrollView style={styles.list}>
          {transactions.map((item) => (
            <TransactionCard key={item.id} item={item} />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyState}>
          <Clock size={48} color={COLORS.grey[200]} strokeWidth={1.5} />
          <Text size={14} lineHeight={22} color="grey-400" align="center" style={styles.emptyText}>
            Once you start making transactions, your history will show up here.
          </Text>
        </View>
      )}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
  },
  list: {
    paddingTop: 8,
  },
  card: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey[50],
    rowGap: 4,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 16,
    paddingHorizontal: 40,
  },
  emptyText: {
    maxWidth: 260,
  },
})
