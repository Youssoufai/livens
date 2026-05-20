import { View, StyleSheet, Pressable } from 'react-native'
import { useMemo, useState } from 'react'
import { Menu } from 'react-native-paper'
import { Ellipsis } from 'lucide-react-native'

import Text from '@/components/text'
import { COLORS } from '@/constants/theme'
import Button from '@/components/ui/button'
import { useReverseGeoCoding } from '@/hooks/use-reverse-geocode'
import { RequestStatusType } from '@/services/requests/request.types'

import { RequestCardProps } from '../requests.types'

const STATUS_COLORS: Partial<
  Record<RequestStatusType, { label: string; color: string }>
> = {
  pending: {
    label: 'Pending',
    color: COLORS.yellow[600],
  },
  active: {
    label: 'Active',
    color: COLORS.primary[500],
  },
  'waiting for approval': {
    label: 'Active',
    color: COLORS.primary[500],
  },
  completed: {
    label: 'Completed',
    color: COLORS.green[500],
  },
  // Add more statuses and colors as needed
}

const RequestCard = ({
  id,
  status = 'active',
  title,
  description,
  buttonText = 'View responders',
  onPress = () => {},
  onCancelRequest,
}: RequestCardProps) => {
  const [showMenu, setShowMenu] = useState(false)

  const locationDetails =
    typeof title === 'string' ? title : useReverseGeoCoding(title)

  const statusDetails = STATUS_COLORS[status]

  const btnStyle = useMemo(
    () => ({ ...styles.button, backgroundColor: statusDetails?.color }),
    [statusDetails?.color]
  )

  const moreOptionsContent =
    status !== 'completed' ? (
      <Menu
        visible={showMenu}
        anchor={
          <Pressable onPress={() => setShowMenu(true)}>
            <Ellipsis size={24} color="#1C1B1F" />
          </Pressable>
        }
        anchorPosition="bottom"
        contentStyle={styles.dropdownMenuContent}
        onDismiss={() => setShowMenu(false)}
      >
        <Menu.Item
          title={
            <Text size={14} lineHeight={20} color="red-500">
              Cancel request
            </Text>
          }
          style={styles.dropdownItem}
          onPress={() => {
            setShowMenu(false)
            onCancelRequest?.(id ?? '')
          }}
        />
      </Menu>
    ) : null

  return (
    <View style={styles.cardContainer}>
      <View
        style={[styles.statusBar, { backgroundColor: statusDetails?.color }]}
      >
        <Text
          size={11}
          lineHeight={14}
          color="white"
          weight={500}
          style={styles.statusText}
        >
          {statusDetails?.label}
        </Text>
      </View>
      <View style={styles.content}>
        <View style={styles.titleWrapper}>
          <View style={styles.location}>
            <Text size={16} lineHeight={20} weight={600} color="black">
              {typeof locationDetails === 'string'
                ? locationDetails
                : locationDetails?.name}
            </Text>
          </View>
          {moreOptionsContent}
        </View>
        <Text size={14} lineHeight={20} color="grey-300">
          {description}
        </Text>
        <Button
          label={buttonText}
          onPress={() => onPress(id ?? '')}
          btnStyle={btnStyle}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  statusBar: {
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  statusText: {
    alignSelf: 'center',
    textTransform: 'capitalize',
    marginTop: 2,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    columnGap: 8,
  },
  location: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 24,
    rowGap: 6,
    marginBottom: 16,
  },
  dropdownMenuContent: {
    backgroundColor: COLORS.white,
  },
  dropdownItem: {
    backgroundColor: COLORS.white,
  },
  button: {
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    height: 36,
  },
})

export default RequestCard
