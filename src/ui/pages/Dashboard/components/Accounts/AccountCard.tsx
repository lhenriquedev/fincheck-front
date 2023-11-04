import { BankAccount } from '../../../../../app/entities/BankAccount'
import { BankAccountTypeIcon } from '../../../../components/icons/BankAccountTypeIcon'
import { cn } from '../../../../../app/utils/cn'
import { formatCurrency } from '../../../../../app/utils/formatCurrency'
import { useAccountsController } from './useAccountsController'

interface AccountCardProps {
  data: BankAccount
}

export function AccountCard({ data }: AccountCardProps) {
  const { color, name, currentBalance, type } = data
  const { areValuesVisible, openEditAccountModal } = useAccountsController()

  return (
    <div
      style={{ borderColor: color }}
      className='p-4 bg-white rounded-2xl h-[200px] flex flex-col justify-between border-b-4 border-teal-950'
      role='button'
      onClick={() => openEditAccountModal(data)}>
      <header>
        <BankAccountTypeIcon type={type} />
        <span className='text-gray-800 font-medium tracking-[-0.5px] mt-4 block'>{name}</span>
      </header>

      <div>
        <span
          className={cn(
            'text-gray-800 font-medium tracking-[-0.5px] block',
            !areValuesVisible && 'blur-sm'
          )}>
          {formatCurrency(currentBalance)}
        </span>
        <small className='text-sm text-gray-600'>Saldo atual</small>
      </div>
    </div>
  )
}
