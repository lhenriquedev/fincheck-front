import { useMutation, useQueryClient } from '@tanstack/react-query'

import { bankAccountsService } from '../../../../../app/services/bankAccountService'
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber'
import toast from 'react-hot-toast'
import { useDashboard } from '../../../../../app/contexts/DashboardContext'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  initialBalance: z.union([
    z.string().min(1, { message: 'Saldo inicial é obrigatório!' }),
    z.number(),
  ]),
  name: z.string().min(1, { message: 'Nome da conta é obrigatório!' }),
  type: z.enum(['INVESTMENT', 'CHECKING', 'CASH']),
  color: z.string().min(1, { message: 'Cor é obrigatória!' }),
})

type FormData = z.infer<typeof schema>

export const useEditAccountModalController = () => {
  const { isEditAccountModalOpen, closeEditAccountModal, accountBeingEdited } = useDashboard()

  const queryClient = useQueryClient()

  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: accountBeingEdited?.color,
      name: accountBeingEdited?.name,
      type: accountBeingEdited?.type,
      initialBalance: accountBeingEdited?.initialBalance,
    },
  })

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const { isPending: isCreatingAccount, mutateAsync: createNewAccount } = useMutation({
    mutationFn: bankAccountsService.update,
  })

  const { isPending: isRemove, mutateAsync: removeAccount } = useMutation({
    mutationFn: bankAccountsService.remove,
  })

  const handleSubmit = hookFormSubmit(async data => {
    try {
      await createNewAccount({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
        id: accountBeingEdited!.id,
      })

      toast.success('A conta foi editada com sucesso.')
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })
      closeEditAccountModal()
    } catch (error) {
      toast.error('Erro ao salvar as alterações')
    }
  })

  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true)
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false)

  const handleDeleteAccount = async () => {
    try {
      await removeAccount(accountBeingEdited!.id)

      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })
      toast.success('A conta foi removida com sucesso.')
      closeEditAccountModal()
    } catch (error) {
      toast.error('Erro ao remover a conta!')
    }
  }

  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isCreatingAccount,
    handleOpenDeleteModal,
    isDeleteModalOpen,
    handleCloseDeleteModal,
    handleDeleteAccount,
    isRemove,
    removeAccount,
  }
}
