import { useMemo, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Transaction } from '../../../../../app/entities/Transaction'
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber'
import { toast } from 'react-hot-toast'
import { transactionsService } from '../../../../../app/services/transactionsService'
import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts'
import { useCategories } from '../../../../../app/hooks/useCategories'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  value: z.union([z.string().min(1, 'Informe o valor'), z.number().min(1, 'Informe o valor')]),
  name: z.string().min(1, 'Informe o nome'),
  categoryId: z.string().min(1, 'Informe a categoria'),
  bankAccountId: z.string().min(1, 'Informe a categoria'),
  date: z.date(),
})

type FormData = z.infer<typeof schema>

export const useEditTransactionModalController = (
  transaction: Transaction | null,
  onClose: () => void
) => {
  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      name: transaction?.name,
      value: transaction?.value,
      date: transaction ? new Date(transaction?.date) : new Date(),
    },
  })

  const queryClient = useQueryClient()

  const { accounts } = useBankAccounts()
  const { categories: categoriesList } = useCategories()

  const { mutateAsync: updateTransaction, isPending: isEditing } = useMutation({
    mutationFn: transactionsService.update,
  })
  const { isPending: isRemoving, mutateAsync: removeTransaction } = useMutation({
    mutationFn: transactionsService.remove,
  })

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleSubmit = hookFormSubmit(async data => {
    try {
      await updateTransaction({
        ...data,
        id: transaction!.id,
        value: currencyStringToNumber(data.value),
        type: transaction!.type,
        date: data.date.toISOString(),
      })

      toast.success(
        transaction!.type === 'EXPENSE'
          ? 'Despesa editada com sucesso'
          : 'Receita editada com sucesso'
      )
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      onClose()
    } catch (error) {
      toast.error(
        transaction!.type === 'EXPENSE' ? 'Erro ao editar despesa!' : 'Erro ao editar receita!'
      )
    }
  })

  const categories = useMemo(() => {
    return categoriesList.filter(category => category.type === transaction?.type)
  }, [categoriesList, transaction])

  const handleDeleteTransaction = async () => {
    try {
      await removeTransaction(transaction!.id)

      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      toast.success('Transação foi removida com sucesso.')
      onClose()
    } catch (error) {
      toast.error('Erro ao deletar transação!')
    }
  }

  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false)

  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true)

  return {
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    transaction,
    isDeleteModalOpen,
    isEditing,
    isLoadingDelete: isRemoving,
    handleCloseDeleteModal,
    handleDeleteTransaction,
    handleOpenDeleteModal,
  }
}
