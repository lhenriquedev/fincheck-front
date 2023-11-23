import { useEffect, useState } from 'react'

import { Transaction } from '../../../../../app/entities/Transaction'
import { TransactionsFilters } from '../../../../../app/services/transactionsService/getAll'
import { useDashboard } from '../../../../../app/contexts/DashboardContext'
import { useTransactions } from '../../../../../app/hooks/useTransactions'

export const useTransactionsController = () => {
  const [filters, setFilters] = useState<TransactionsFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  })
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isFiltersModalOpen, setFiltersModalOpen] = useState(false)
  const [transactionBeingEdited, setTransactionBeingEdited] = useState<null | Transaction>(null)

  const { transactions, isTransactionsLoading, isInitialLoading, refetchTransactions } =
    useTransactions(filters)
  const { areValuesVisible } = useDashboard()

  function handleChangeFilters<TFilter extends keyof TransactionsFilters>(filter: TFilter) {
    return (value: TransactionsFilters[TFilter]) => {
      if (value === filters[filter]) return

      setFilters(prevState => ({
        ...prevState,
        [filter]: value,
      }))
    }
  }

  function handleApplyFilters({
    bankAccountId,
    year,
  }: {
    bankAccountId: string | undefined
    year: number
  }) {
    handleChangeFilters('bankAccountId')(bankAccountId)
    handleChangeFilters('year')(year)
    setFiltersModalOpen(false)
  }

  useEffect(() => {
    refetchTransactions()
  }, [filters, refetchTransactions])

  const handleOpenFiltersModal = () => setFiltersModalOpen(true)
  const handleCloseFiltersModal = () => setFiltersModalOpen(false)

  const handleOpenEditTransactionModal = (transaction: Transaction) => {
    setIsEditModalOpen(true)
    setTransactionBeingEdited(transaction)
  }
  const handleCloseEditTransactionModal = () => {
    setIsEditModalOpen(false)
    setTransactionBeingEdited(null)
  }

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
    transactionBeingEdited,
    isEditModalOpen,
    handleOpenEditTransactionModal,
    handleCloseEditTransactionModal,
  }
}
