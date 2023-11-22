import { useBankAccounts } from '../../../../../../app/hooks/useBankAccounts'
import { useState } from 'react'

export const useFiltersModalController = () => {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<undefined | string>(undefined)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const { accounts } = useBankAccounts()

  const handleSelectBankAccount = (bankAccountId: string) => {
    setSelectedBankAccountId(prevState => (prevState === bankAccountId ? undefined : bankAccountId))
  }

  const handleChangeYear = (step: number) => {
    setSelectedYear(prevState => prevState + step)
  }

  return {
    selectedBankAccountId,
    handleSelectBankAccount,
    selectedYear,
    handleChangeYear,
    accounts,
  }
}
