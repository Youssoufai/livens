import { StyleSheet, View } from 'react-native'
import { useRef } from 'react'

import BottomSheet from '@/components/bottomsheet'
import { COLORS } from '@/constants/theme'
import { getBankList } from '@/services/profile'

import { WithdrawSheetProps } from '../profile.types'
import AddAccount from './add-account'
import WithdrawAmount from './withdraw-amount'

const WithdrawalSheet = ({
  isVisible,
  type,
  recipientCode,
  onCloseSheet,
}: WithdrawSheetProps) => {
  const snapPoint = useRef([500, 290]).current

  const sheetContent: Record<string, SheetContentType> = {
    add_account: {
      title: 'Add bank account',
      index: 0,
      content: <AddAccount onCloseSheet={onCloseSheet} />,
    },
    withdraw: {
      title: 'Withdrawal amount',
      index: 1,
      content: (
        <WithdrawAmount
          recipientCode={recipientCode}
          onCloseSheet={onCloseSheet}
        />
      ),
    },
  }

  return (
    <BottomSheet
      title={sheetContent[type]?.title}
      isVisible={isVisible}
      index={!isVisible ? -1 : sheetContent[type]?.index}
      snapPoints={snapPoint}
      onClose={onCloseSheet}
    >
      {sheetContent[type]?.content}
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 32,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey[50],
  },
  closeBtn: {
    width: 32,
  },
})

export default WithdrawalSheet
