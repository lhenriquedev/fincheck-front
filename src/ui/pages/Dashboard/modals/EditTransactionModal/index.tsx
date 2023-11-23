import { Button } from '../../../../components/Button'
import { ConfirmDeleteModal } from '../../../../components/ConfirmDeleteModal'
import { Controller } from 'react-hook-form'
import { DatePickerInput } from '../../../../components/DatePickerInput'
import { Input } from '../../../../components/Input'
import { InputCurrency } from '../../../../components/InputCurrency'
import { Modal } from '../../../../components/Modal'
import { Select } from '../../../../components/Select'
import { Transaction } from '../../../../../app/entities/Transaction'
import { TrashIcon } from '../../../../components/icons/TrashIcon'
import { useEditTransactionModalController } from './useEditTransactionModalController'

interface EditTransactionModalProps {
  open: boolean
  onClose: () => void
  transaction: Transaction | null
}

export const EditTransactionModal = ({ transaction, open, onClose }: EditTransactionModalProps) => {
  const {
    control,
    errors,
    handleSubmit,
    register,
    accounts,
    categories,
    isEditing,
    isDeleteModalOpen,
    isLoadingDelete,
    handleCloseDeleteModal,
    handleDeleteTransaction,
    handleOpenDeleteModal,
  } = useEditTransactionModalController(transaction, onClose)

  const isExpense = transaction?.type === 'EXPENSE'

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        isLoading={isLoadingDelete}
        title={`Tem certeza que deseja excluir esta ${isExpense ? 'despesa' : 'receita'}?`}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteTransaction}
      />
    )
  }

  return (
    <Modal
      title={isExpense ? 'Editar Despesa' : 'Editar Receita'}
      open={open}
      onClose={onClose}
      rightAction={
        <button onClick={handleOpenDeleteModal}>
          <TrashIcon className='w-6 h-6 text-red-900' />
        </button>
      }>
      <form onSubmit={handleSubmit}>
        <div>
          <span className='text-gray-600 tracking-[-0.5px] text-xs'>
            Valor {isExpense ? 'da despesa' : 'da receita'}
          </span>
          <div className='flex items-center gap-2'>
            <span className='text-gray-600 tracking-[-0.5px] text-lg'>R$</span>
            <Controller
              name='value'
              defaultValue='0'
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.value?.message}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
        </div>

        <div className='flex flex-col gap-4 mt-10'>
          <Input
            type='text'
            placeholder={isExpense ? 'Nome da despesa' : 'Nome da receita'}
            error={errors.name?.message}
            {...register('name')}
          />
          <Controller
            control={control}
            name='categoryId'
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder='Categoria'
                options={categories.map(category => ({
                  value: category.id,
                  label: category.name,
                }))}
                error={errors.categoryId?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name='bankAccountId'
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder={isExpense ? 'Pagar com' : 'Receber com'}
                options={accounts.map(account => ({
                  value: account.id,
                  label: account.name,
                }))}
                error={errors.bankAccountId?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name='date'
            defaultValue={new Date()}
            render={({ field: { value, onChange } }) => (
              <DatePickerInput
                value={value}
                error={errors.date?.message}
                onChange={onChange}
              />
            )}
          />
        </div>

        <Button
          type='submit'
          className='w-full mt-6'
          isLoading={isEditing}>
          Editar
        </Button>
      </form>
    </Modal>
  )
}
