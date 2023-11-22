import { useEffect, useState } from 'react'

import { TransactionsFilters } from '../../../../../app/services/transactionsService/getAll'
import { useDashboard } from '../../../../../app/contexts/DashboardContext'
import { useTransactions } from '../../../../../app/hooks/useTransactions'

export const useTransactionsController = () => {
  const [filters, setFilters] = useState<TransactionsFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  })
  const { areValuesVisible } = useDashboard()

  const [isFiltersModalOpen, setFiltersModalOpen] = useState(false)

  const { transactions, isTransactionsLoading, isInitialLoading, refetchTransactions } =
    useTransactions(filters)


  function handleChangeFilters<TFilter extends keyof TransactionsFilters>(filter: TFilter) {
    return (value: TransactionsFilters[TFilter]) => {
      if (value === filters[filter]) return

      setFilters(prevState => ({
        ...prevState,
        [filter]: value
      }))
    }
  }

  function  handleApplyFilters({
    bankAccountId,
    year
  }: { bankAccountId: string |  undefined; year: number }) {
    handleChangeFilters('bankAccountId')(bankAccountId)
    handleChangeFilters('year')(year)
    setFiltersModalOpen(false)
  }


  useEffect(() => {
    refetchTransactions()
  }, [filters, refetchTransactions])

  const handleOpenFiltersModal = () => setFiltersModalOpen(true)
  const handleCloseFiltersModal = () => setFiltersModalOpen(false)

  return {
    areValuesVisible,
    isInitialLoading,
    isLoading: isTransactionsLoading,
    transactions,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    filters,
    handleChangeFilters,
    handleApplyFilters,
  }
}
