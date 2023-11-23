import { bankAccountsService } from '../services/bankAccountService'
import { useQuery } from '@tanstack/react-query'

export const useBankAccounts = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: bankAccountsService.getAll,
    staleTime: Infinity,
  })

  return {
    accounts: data ?? [],
    isLoadingAccounts: isLoading,
  }
}
