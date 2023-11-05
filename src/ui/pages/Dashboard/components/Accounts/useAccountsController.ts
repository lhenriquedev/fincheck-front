import { useMemo, useState } from 'react'

import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts'
import { useDashboard } from '../../../../../app/contexts/DashboardContext'
import { useWindowWidth } from '../../../../../app/hooks/useWindowWidth'

export const useAccountsController = () => {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  })

  const windowWidth = useWindowWidth()
  const { areValuesVisible, toggleValuesVisibility, openNewAccountModal, openEditAccountModal } =
    useDashboard()

  const { accounts, isLoadingAccounts } = useBankAccounts()

  const currentBalance = useMemo(() => {
    return accounts.reduce((total, account) => total + account.currentBalance, 0)
  }, [accounts])

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    currentBalance,
    toggleValuesVisibility,
    isLoadingAccounts,
    accounts,
    openNewAccountModal,
    openEditAccountModal,
  }
}
