import { useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { ChevronDown, ChevronUp } from 'lucide-react-native'

import Text from '@/components/text'
import { ThemedView } from '@/components/themed-view'
import ScrollView from '@/components/scrollview'
import { COLORS } from '@/constants/theme'
import { FaqItem } from '@/modules/profile/profile.types'
import { FAQ_DATA } from '@/modules/profile/profile.data'

const FaqRow = ({ item }: { item: FaqItem }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <Pressable style={styles.faqRow} onPress={() => setExpanded((v) => !v)}>
      <View style={styles.faqRowHeader}>
        <Text
          size={15}
          lineHeight={22}
          weight={500}
          color="grey-800"
          style={styles.faqQuestion}
        >
          {item.question}
        </Text>
        {expanded ? (
          <ChevronUp size={18} color={COLORS.grey[400]} />
        ) : (
          <ChevronDown size={18} color={COLORS.grey[400]} />
        )}
      </View>
      {expanded && (
        <Text
          size={14}
          lineHeight={22}
          color="grey-400"
          style={styles.faqAnswer}
        >
          {item.answer}
        </Text>
      )}
    </Pressable>
  )
}

export default function FAQsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Text
          size={22}
          lineHeight={28}
          weight={700}
          color="grey-800"
          style={styles.heading}
        >
          Frequently Asked Questions
        </Text>

        {FAQ_DATA.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text
              size={12}
              lineHeight={16}
              weight={600}
              color="grey-400"
              style={styles.sectionTitle}
            >
              {section.title}
            </Text>
            <View style={styles.sectionItems}>
              {section.items.map((item) => (
                <FaqRow key={item.question} item={item} />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  scroll: {
    rowGap: 28,
  },
  heading: {
    marginBottom: 4,
  },
  section: {
    rowGap: 0,
  },
  sectionTitle: {
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey[50],
  },
  sectionItems: {},
  faqRow: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey[50],
    rowGap: 8,
  },
  faqRowHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    columnGap: 12,
  },
  faqQuestion: {
    flex: 1,
  },
  faqAnswer: {},
})
