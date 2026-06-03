import { StyleSheet, Text, View } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ActivityIndicator, TextInput } from 'react-native-paper'

import SelectInput from '@/components/select-input'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import { COLORS } from '@/constants/theme'
import { addBankSchema, AddBankSchemaType } from '@/schemas/profile'
import { useAddAccountMutation } from '@/hooks/mutations/use-profile'
import { showToastMessage } from '@/components/notification'
import { catchErr } from '@/utils/error-handlers'
import { getAccountName, getBankList } from '@/services/profile'
import SheetInput from '@/components/ui/sheet-input'

const AddAccount = ({ onCloseSheet }: { onCloseSheet: VoidFunction }) => {
  const [bankList, setBankList] = useState<ListItem[]>([])
  const [isLoadingName, setIsLoadingName] = useState(false)

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    setError,
    formState: { isValid, isSubmitting },
  } = useForm({ resolver: yupResolver(addBankSchema) })

  const { mutateAsync: addAccount } = useAddAccountMutation()

  const bank = watch('bank')
  const accountNumber = watch('accountNumber')

  const fetchBanks = useCallback(async () => {
    try {
      const banks = await getBankList()

      setBankList(banks)
    } catch (error) {}
  }, [])

  const handleAccountName = useCallback(async () => {
    if (!bank || !accountNumber) return

    if (accountNumber.length < 10) return

    setIsLoadingName(true)
    try {
      const name = await getAccountName(bank, accountNumber)

      name && setValue('accountName', name, { shouldValidate: true })
    } catch (error) {
      console.error(error)
      setError('accountName', catchErr(error), { shouldFocus: true })
    } finally {
      setIsLoadingName(false)
    }
  }, [bank, accountNumber])

  useEffect(() => {
    fetchBanks()
  }, [fetchBanks])

  useEffect(() => {
    handleAccountName()
  }, [handleAccountName])

  const handleAddBank: SubmitHandler<AddBankSchemaType> = async (values) => {
    try {
      const bankObj = bankList.find((item) => item.value === bank)

      await addAccount({
        bank_code: values.bank,
        account_number: values.accountNumber,
        bank_name: bankObj?.label ?? '',
      })
      onCloseSheet()
    } catch (error) {
      showToastMessage(
        catchErr(error).message ?? 'Failed to add the account',
        'error',
        'top-center'
      )
    }
  }

  return (
    <View style={styles.sheetBody}>
      <SelectInput
        control={control}
        options={bankList}
        name="bank"
        label="Choose bank"
        placeholder="Choose Bank"
      />

      <SheetInput
        control={control}
        name="accountNumber"
        label="Account number"
        placeholder=""
        keyboardType="number-pad"
        maxLength={10}
        addBottomPadding={false}
      />
      <Input
        control={control}
        name="accountName"
        label="Account name"
        placeholder=""
        addBottomPadding={false}
        disabled
        editable
        right={
          isLoadingName ? (
            <TextInput.Icon
              icon={() => (
                <ActivityIndicator size={18} color={COLORS.green[200]} />
              )}
            />
          ) : undefined
        }
      />

      <Button
        label="Add bank account"
        onPress={handleSubmit(handleAddBank)}
        disabled={!isValid}
        loading={isSubmitting}
        btnStyle={styles.addBankSubmit}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  sheetBody: {
    paddingHorizontal: 20,
    paddingTop: 20,
    rowGap: 10,
  },
  field: {
    rowGap: 6,
  },
  fieldLabel: {},
  selectInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.grey[100],
    borderRadius: 4,
    paddingHorizontal: 14,
    height: 52,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: COLORS.grey[100],
    borderRadius: 4,
    maxHeight: 180,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey[50],
  },
  addBankSubmit: {
    marginTop: 8,
  },
})

export default AddAccount
