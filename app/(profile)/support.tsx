import { StyleSheet, View } from 'react-native'
import { HelpCircle, MessageSquare } from 'lucide-react-native'

import Text from '@/components/text'
import { ThemedView } from '@/components/themed-view'
import ScrollView from '@/components/scrollview'
import { COLORS } from '@/constants/theme'
import MessageIcon from '@/assets/icons/3p.svg'
import SupportItem from '@/modules/profile/components/support-item'

export default function HelpAndSupport() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <MessageIcon />
          </View>
          <Text size={20} lineHeight={28} weight={700} color="grey-800">
            Support
          </Text>
          <Text size={14} lineHeight={22} color="grey-400" align="center">
            Find answers to the most common questions or contact us directly.
          </Text>
        </View>

        <View style={styles.itemList}>
          <SupportItem
            icon={<HelpCircle size={22} color={COLORS.grey[500]} />}
            title="FAQs"
            description="Find quick answers to common questions about using the app."
            href="/(profile)/faqs"
          />
          <SupportItem
            icon={<MessageSquare size={22} color={COLORS.grey[500]} />}
            title="Send us a message"
            description="Drop us a message and we'll get back to you as soon as possible."
            href="/(profile)/contact"
          />
        </View>
      </ScrollView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  scroll: {
    rowGap: 32,
  },
  hero: {
    alignItems: 'center',
    rowGap: 10,
    paddingVertical: 20,
  },
  heroIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  itemList: {
    rowGap: 0,
  },
})
