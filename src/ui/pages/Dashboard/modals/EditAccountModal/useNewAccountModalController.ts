import { useMutation, useQueryClient } from '@tanstack/react-query'

import { bankAccountsService } from '../../../../../app/services/bankAccountService'
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber'
import toast from 'react-hot-toast'
import { useDashboard } from '../../../../../app/contexts/DashboardContext'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  initialBalance: z.string().min(1, { message: 'Saldo inicial é obrigatório!' }),
  name: z.string().min(1, { message: 'Nome da conta é obrigatório!' }),
  type: z.enum(['INVESTMENT', 'CHECKING', 'CASH']),
  color: z.string().min(1, { message: 'Cor é obrigatória!' }),
})

type FormData = z.infer<typeof schema>

export const useNewAccountModalController = () => {
  const { isEditAccountModalOpen, closeEditAccountModal } = useDashboard()

  const queryClient = useQueryClient()

  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const { isPending: isCreatingAccount, mutateAsync: createNewAccount } = useMutation({
    mutationFn: bankAccountsService.create,
  })

  const handleSubmit = hookFormSubmit(async data => {
    try {
      await createNewAccount({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
      })

      toast.success('Conta foi cadastrada com sucesso.')
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })
      closeEditAccountModal()
      reset()
    } catch (error) {
      toast.error('Erro ao cadastrar a conta')
    }
  })

  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isCreatingAccount,
  }
}
