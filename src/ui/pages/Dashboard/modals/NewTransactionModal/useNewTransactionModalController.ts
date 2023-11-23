import { useMutation, useQueryClient } from '@tanstack/react-query'

import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber'
import toast from 'react-hot-toast'
import { transactionsService } from '../../../../../app/services/transactionsService'
import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts'
import { useCategories } from '../../../../../app/hooks/useCategories'
import { useDashboard } from '../../../../../app/contexts/DashboardContext'
import { useForm } from 'react-hook-form'
import { useMemo } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  value: z.string().min(1, 'Informe o valor'),
  name: z.string().min(1, 'Informe o nome'),
  categoryId: z.string().min(1, 'Informe a categoria'),
  bankAccountId: z.string().min(1, 'Informe a categoria'),
  date: z.date(),
})

type FormData = z.infer<typeof schema>

export const useNewTransactionModalController = () => {
  const { isNewTransactionModalOpen, closeNewTransactionModal, newTransactionType } = useDashboard()

  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      date: new Date(),
    },
  })

  const queryClient = useQueryClient()

  const { accounts } = useBankAccounts()
  const { categories: categoriesList } = useCategories()
  const { isPending: isCreating, mutateAsync: createTransaction } = useMutation({
    mutationFn: transactionsService.create,
  })

  const handleSubmit = hookFormSubmit(async data => {
    try {
      await createTransaction({
        ...data,
        value: currencyStringToNumber(data.value),
        type: newTransactionType!,
        date: data.date.toISOString(),
      })

      toast.success(
        newTransactionType === 'EXPENSE'
          ? 'Despesa cadastrada com sucesso'
          : 'Receita cadastrada com sucesso'
      )
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })
      closeNewTransactionModal()
      reset()
    } catch (error) {
      toast.error(
        newTransactionType === 'EXPENSE'
          ? 'Erro ao cadastrar despesa!'
          : 'Erro ao cadastrar receita!'
      )
    }
  })

  const categories = useMemo(() => {
    return categoriesList.filter(category => category.type === newTransactionType)
  }, [categoriesList, newTransactionType])

  return {
    closeNewTransactionModal,
    isNewTransactionModalOpen,
    newTransactionType,
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isCreating,
  }
}
