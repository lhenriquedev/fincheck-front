import { Button } from './Button'
import { Modal } from './Modal'
import { TrashIcon } from './icons/TrashIcon'

interface ConfirmDeleteModalProps {
  title: string
  description?: string
  isRemove?: boolean
  onClose: () => void
  onConfirm: () => void
  isLoading: boolean
}

export const ConfirmDeleteModal = ({
  onClose,
  title,
  description,
  onConfirm,
  isLoading,
}: ConfirmDeleteModalProps) => {
  return (
    <Modal
      open
      title='Excluir'
      onClose={onClose}>
      <div className='flex flex-col items-center gap-6 text-center'>
        <div className='w-[52px] h-[52px] rounded-full bg-red-50 flex items-center justify-center'>
          <TrashIcon className='w-6 h-6 text-red-900' />
        </div>

        <p className='font-bold text-gray-800 w-44 tracking-[-0.5px]'>{title}</p>
        {description && <p className='tracking-[-0.5px] text-gray-800'>{description}</p>}
      </div>

      <div className='mt-10 space-y-4'>
        <Button
          className='w-full'
          variant='danger'
          onClick={onConfirm}
          isLoading={isLoading}>
          Sim, desejo excluir
        </Button>
        <Button
          disabled={isLoading}
          className='w-full'
          variant='ghost'
          onClick={onClose}>
          Cancelar
        </Button>
      </div>
    </Modal>
  )
}