import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'

import SelectInput from '@/components/select-input'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import { COLORS } from '@/constants/theme'
import { addBankSchema, AddBankSchemaType } from '@/schemas/profile'
import { useAddAccountMutation } from '@/hooks/mutations/use-profile'
import { showToastMessage } from '@/components/notification'
import { catchErr } from '@/utils/error-handlers'

const AddAccount = ({ onCloseSheet }: { onCloseSheet: VoidFunction }) => {
  const [bankList, setBankList] = useState([])

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({ resolver: yupResolver(addBankSchema) })

  const { mutateAsync: addAccount } = useAddAccountMutation()

  const handleAddBank: SubmitHandler<AddBankSchemaType> = async (values) => {
    try {
      await addAccount()
    } catch (error) {
      showToastMessage(
        catchErr(error).message ?? 'Failed to add the account',
        'error'
      )
    }
  }

  return (
    <View style={styles.sheetBody}>
      <View style={styles.field}>
        <SelectInput
          control={control}
          options={bankList}
          name="bank"
          label="Choose bank"
          placeholder=""
        />
      </View>

      <View style={styles.field}>
        <Input
          control={control}
          label="Account number"
          placeholder="0000000000"
          keyboardType="number-pad"
          maxLength={10}
          addBottomPadding={false}
        />
      </View>

      <View style={styles.field}>
        <Input
          control={control}
          label="Account name"
          placeholder="Ex. John Doe"
          addBottomPadding={false}
        />
      </View>

      <Button
        label="Add bank account"
        onPress={handleSubmit(handleAddBank)}
        disabled={!isValid}
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
