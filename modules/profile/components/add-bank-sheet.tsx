import { StyleSheet, View } from 'react-native'
import { useCallback, useEffect, useRef, useState } from 'react'

import BottomSheet from '@/components/bottomsheet'
import { COLORS } from '@/constants/theme'

import { WithdrawSheetProps } from '../profile.types'
import AddAccount from './add-account'
import WithdrawAmount from './withdraw-amount'

const WithdrawalSheet = ({
  isVisible,
  type,
  onCloseSheet,
}: WithdrawSheetProps) => {
  const snapPoint = useRef([500, 250]).current

  const getBanks = useCallback(async () => {
    try {
    } catch (error) {}
  }, [])

  useEffect(() => {
    getBanks()
  }, [getBanks])

  const sheetContent: Record<string, SheetContentType> = {
    add_account: {
      title: 'Add bank account',
      index: 0,
      content: <AddAccount onCloseSheet={onCloseSheet} />,
    },
    withdraw: {
      title: 'Withdrawal amount',
      index: 1,
      content: <WithdrawAmount onCloseSheet={onCloseSheet} />,
    },
  }

  return (
    <BottomSheet
      title={sheetContent[type]?.title}
      isVisible={isVisible}
      index={isVisible ? 0 : sheetContent[type]?.index}
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
