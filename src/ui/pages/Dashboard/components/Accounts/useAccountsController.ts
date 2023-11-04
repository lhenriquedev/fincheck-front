import { useMemo, useState } from 'react'

import { bankAccountsService } from '../../../../../app/services/bankAccountService'
import { useDashboard } from '../../../../../app/contexts/DashboardContext'
import { useQuery } from '@tanstack/react-query'
import { useWindowWidth } from '../../../../../app/hooks/useWindowWidth'

export const useAccountsController = () => {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  })

  const windowWidth = useWindowWidth()
  const { areValuesVisible, toggleValuesVisibility, openNewAccountModal, openEditAccountModal } =
    useDashboard()

  const { data = [], isLoading } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: bankAccountsService.getAll,
  })

  const currentBalance = useMemo(() => {
    if (!data) return

    return data.reduce((total, account) => total + account.currentBalance, 0)
  }, [data])

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    currentBalance,
    toggleValuesVisibility,
    isLoading,
    accounts: data,
    openNewAccountModal,
    openEditAccountModal,
  }
}
