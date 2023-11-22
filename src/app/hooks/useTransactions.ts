import { TransactionsFilters } from '../services/transactionsService/getAll'
import { transactionsService } from '../services/transactionsService'
import { useQuery } from '@tanstack/react-query'

export const useTransactions = (filters: TransactionsFilters) => {
  const { isFetching, error, data, isInitialLoading, refetch } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactionsService.getAll(filters),
  })

  return {
    transactions: data ?? [],
    isTransactionsLoading: isFetching,
    error,
    isInitialLoading,
    refetchTransactions: refetch,
  }
}
