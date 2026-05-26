import { View, StyleSheet, Pressable, ColorValue } from 'react-native'
import { useMemo, useState } from 'react'
import { Menu } from 'react-native-paper'
import { Ellipsis } from 'lucide-react-native'

import Text from '@/components/text'
import { COLORS } from '@/constants/theme'
import Button from '@/components/ui/button'
import { useReverseGeoCoding } from '@/hooks/use-reverse-geocode'
import { RequestStatusType } from '@/services/requests/request.types'

import {
  OutgoingRequestCardProps,
  OutgoingStatusColorType,
} from '../requests.types'

const STATUS_COLORS: Partial<
  Record<RequestStatusType, OutgoingStatusColorType>
> = {
  pending: {
    label: 'Pending',
    color: COLORS.grey[600],
    bgColor: COLORS.grey[50],
    btnColor: COLORS.grey[400],
  },
  active: {
    label: 'Ongoing',
    color: COLORS.white,
    bgColor: COLORS.primary[500],
    btnColor: COLORS.primary[400],
  },
  'waiting for approval': {
    label: 'Pending Approval & Payment',
    color: COLORS.yellow[900],
    bgColor: COLORS.yellow[100],
    btnColor: COLORS.yellow[400],
  },
  completed: {
    label: 'Completed',
    color: COLORS.green[500],
    bgColor: COLORS.green[50],
    btnColor: COLORS.green[400],
  },
}

const OngoingRequestCard = ({
  id,
  requesterId,
  conversationId,
  status = 'active',
  title,
  description,
  isChatLoading,
  onAddResponse = () => {},
  onEditResponse = () => {},
  onWithdrawResponse,
  onMessage,
}: OutgoingRequestCardProps) => {
  const [showMenu, setShowMenu] = useState(false)

  const locationDetails =
    typeof title === 'string' ? title : useReverseGeoCoding(title)

  const statusDetails = STATUS_COLORS[status]

  const contentStyle = useMemo(
    () => ({
      button: {
        ...styles.button,
        backgroundColor: statusDetails?.btnColor,
        borderWidth: 0,
      },
      text: { color: statusDetails?.color as ColorValue },
    }),
    [statusDetails?.color, statusDetails?.btnColor]
  )

  const buttonText =
    status === 'waiting for approval'
      ? 'Edit response'
      : status === 'active'
        ? 'Add response'
        : null

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
            <Text size={14} lineHeight={20} weight={500} color="red-500">
              Withdraw offer
            </Text>
          }
          style={styles.dropdownItem}
          onPress={() => {
            setShowMenu(false)
            onWithdrawResponse?.(id ?? '')
          }}
        />
      </Menu>
    ) : null

  return (
    <View style={styles.cardContainer}>
      <View
        style={[styles.statusBar, { backgroundColor: statusDetails?.bgColor }]}
      >
        <Text
          size={11}
          lineHeight={14}
          color="white"
          weight={500}
          style={[styles.statusText, contentStyle.text]}
        >
          {statusDetails?.label}
        </Text>
      </View>
      <View style={styles.content}>
        <View>
          <View style={styles.titleWrapper}>
            <View style={styles.location}>
              <Text size={16} lineHeight={20} weight={600} color="black">
                {typeof locationDetails === 'string'
                  ? locationDetails
                  : locationDetails?.region}
              </Text>
            </View>
            {moreOptionsContent}
          </View>
          <Text size={14} lineHeight={20} color="grey-300">
            {description}
          </Text>
        </View>
        <View style={styles.buttonWrapper}>
          {buttonText && (
            <Button
              label={buttonText}
              onPress={() => {
                if (status === 'active') {
                  onAddResponse(id ?? '')
                } else if (status === 'waiting for approval') {
                  onEditResponse(id ?? '')
                }
              }}
              labelStyle={
                status === 'active' ? styles.buttonLabel : contentStyle.text
              }
              btnStyle={contentStyle.button}
            />
          )}
          {status !== 'completed' && (
            <Button
              label="Send message"
              onPress={() => onMessage(id ?? '', requesterId, conversationId)}
              buttonColor="white"
              labelColor="grey-800"
              loading={isChatLoading}
              btnStyle={styles.button}
            />
          )}
        </View>
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
    marginBottom: 4,
  },
  location: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 24,
    rowGap: 16,
  },
  dropdownMenuContent: {
    backgroundColor: COLORS.white,
  },
  dropdownItem: {
    backgroundColor: COLORS.white,
  },
  button: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#CDCDCD',
    alignItems: 'center',
    height: 36,
    flex: 1,
  },
  sendMsgButton: {},
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
    marginTop: 8,
  },
  buttonLabel: {
    color: COLORS.white,
  },
})

export default OngoingRequestCard
