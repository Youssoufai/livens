import { Lightbulb } from 'lucide-react-native'
import { Platform, StyleSheet, TextInput, View } from 'react-native'

import Button from '@/components/ui/button'
import Text from '@/components/text'
import { COLORS } from '@/constants/theme'
import Input from '@/components/ui/input'
import ResponseHeader from './response-header'
import ScrollView from '@/components/scrollview'
import KeyboardScrollView from '@/components/keyboard-scrollview'
import { actuateFontSize, actuateLineHeight } from '@/utils/normalize'
import { FONTS } from '@/constants/fonts'

const MAX_COMMENT = 500

interface StepCommentProps {
  comment: string
  onCommentChange: (text: string) => void
  onNext: () => void
}

export default function StepComment({
  comment,
  onCommentChange,
  onNext,
}: StepCommentProps) {
  return (
    <KeyboardScrollView style={styles.container}>
      <ScrollView style={styles.content}>
        <ResponseHeader
          title="Add your comment"
          description="Share any useful details about this place."
        />

        <View style={styles.section}>
          <Text size={16} lineHeight={24} color="grey-500">
            What are your thoughts on this place based on your experience?
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Write comment"
              value={comment}
              onChangeText={(t) => onCommentChange(t.slice(0, MAX_COMMENT))}
              multiline
              textAlignVertical="top"
              style={styles.textInput}
            />
            <Text size={11} color="grey-300" align="right">
              {comment.length}/{MAX_COMMENT}
            </Text>
          </View>
        </View>

        <View style={styles.tipBox}>
          <View style={styles.tipHeader}>
            <Lightbulb size={16} color="#92650A" />
            <Text
              size={13}
              lineHeight={18}
              weight={600}
              style={{ color: '#92650A' }}
            >
              Tip
            </Text>
          </View>
          <Text size={13} lineHeight={20} style={{ color: '#92650A' }}>
            Comments help the requester make better decisions.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button label="Next" disabled={!comment} onPress={onNext} />
      </View>
    </KeyboardScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    paddingBottom: 24,
    paddingHorizontal: 16,
    rowGap: 20,
  },
  subtitle: { marginTop: -8 },
  section: { rowGap: 10 },
  inputWrapper: {
    borderWidth: 1,
    borderColor: COLORS.grey[50],
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    rowGap: 8,
    minHeight: 140,
  },
  textInput: {
    fontSize: actuateFontSize(16),
    lineHeight: actuateLineHeight(16, 24),
    fontFamily: FONTS.dm_sans[400],
    minHeight: 100,
    padding: 0,
  },
  textInputOutline: {
    borderWidth: 0,
  },
  tipBox: {
    backgroundColor: COLORS.yellow[100],
    borderRadius: 12,
    padding: 14,
    rowGap: 6,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 28,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: COLORS.grey[50],
    backgroundColor: COLORS.white,
  },
})
