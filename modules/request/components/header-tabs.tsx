import { Pressable, StyleSheet, View } from 'react-native'

import Text from '@/components/text'
import { COLORS } from '@/constants/theme'
import { globalStyles } from '@/styles/globalStyles'

import { HeaderTabProps } from '../requests.types'

const HeaderTabs = ({ list, selected, onSelect }: HeaderTabProps) => {
  return (
    <View style={styles.container}>
      {list.map((tab, index) => (
        <Pressable
          key={`${tab.value}_${index}`}
          style={({ pressed }) => [
            styles.tabItem,
            selected === tab.value && styles.selected,
            pressed && globalStyles.pressedOpacity,
          ]}
          onPress={() => onSelect(tab.value)}
        >
          <Text
            size={14}
            lineHeight={18}
            weight={600}
            color={selected === tab.value ? 'grey-500' : 'grey-300'}
            align="center"
          >
            {tab.label}
          </Text>
        </Pressable>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    columnGap: 16,
    borderColor: COLORS.grey[50],
    borderBottomWidth: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingTop: 16,
  },
  tabItem: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    borderColor: COLORS.grey[500],
    borderBottomWidth: 1,
  },
})

export default HeaderTabs
