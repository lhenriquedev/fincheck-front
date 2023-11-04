import { Button } from '../../../../components/Button'
import { ColorsDropdownInput } from '../../../../components/ColorsDropdownInput'
import { ConfirmDeleteModal } from '../../../../components/ConfirmDeleteModal'
import { Controller } from 'react-hook-form'
import { Input } from '../../../../components/Input'
import { InputCurrency } from '../../../../components/InputCurrency'
import { Modal } from '../../../../components/Modal'
import { Select } from '../../../../components/Select'
import { TrashIcon } from '../../../../components/icons/TrashIcon'
import { useEditAccountModalController } from './useEditAccountModalController'

export const EditAccountModal = () => {
  const {
    isEditAccountModalOpen,
    closeEditAccountModal,
    errors,
    handleSubmit,
    register,
    control,
    isCreatingAccount,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    isDeleteModalOpen,
    handleDeleteAccount,
    isRemove,
  } = useEditAccountModalController()

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        onClose={handleCloseDeleteModal}
        title='Tem certeza que deseja excluir esta conta?'
        description='Ao excluir a conta, também serão exclúidos os registros de receita e despesas relacionados'
        onConfirm={handleDeleteAccount}
        isLoading={isRemove}
      />
    )
  }

  return (
    <Modal
      title='Editar Conta'
      open={isEditAccountModalOpen}
      onClose={closeEditAccountModal}
      rightAction={
        <button onClick={handleOpenDeleteModal}>
          <TrashIcon className='w-6 h-6 text-red-900' />
        </button>
      }>
      <form onSubmit={handleSubmit}>
        <div>
          <span className='text-gray-600 tracking-[-0.5px] text-xs'>Saldo inicial</span>
          <div className='flex items-center gap-2'>
            <span className='text-gray-600 tracking-[-0.5px] text-lg'>R$</span>
            <Controller
              name='initialBalance'
              defaultValue='0'
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.initialBalance?.message}
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
            placeholder='Nome da conta'
            error={errors.name?.message}
            {...register('name')}
          />
          <Controller
            control={control}
            name='type'
            defaultValue='CHECKING'
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder='Tipo'
                options={[
                  { label: 'Investimento', value: 'INVESTMENT' },
                  { label: 'Conta Corrente', value: 'CHECKING' },
                  { label: 'Dinheiro Físico', value: 'CASH' },
                ]}
                error={errors.type?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name='color'
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <ColorsDropdownInput
                error={errors.color?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </div>

        <Button
          type='submit'
          className='w-full mt-6'
          isLoading={isCreatingAccount}>
          Salvar
        </Button>
      </form>
    </Modal>
  )
}
