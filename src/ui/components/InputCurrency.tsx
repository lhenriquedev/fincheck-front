import { CrossCircledIcon } from '@radix-ui/react-icons'
import { NumericFormat } from 'react-number-format'
import { cn } from '../../app/utils/cn'

interface InputCurrencyProps {
  error?: string
  value?: string
  onChange?: (value: string) => void
}
export const InputCurrency = ({ error, onChange, value }: InputCurrencyProps) => {
  return (
    <div>
      <NumericFormat
        thousandSeparator='.'
        decimalSeparator=','
        value={value}
        onChange={event => onChange?.(event.target.value)}
        className={cn(
          'w-full text-[32px] text-gray-800 font-bold tracking-[-0.5px] outline-none',
          error && '!text-red-900'
        )}
      />

      {error && (
        <div className='flex items-center gap-2 mt-2 text-red-900'>
          <CrossCircledIcon />
          <p className='text-xs'>{error}</p>
        </div>
      )}
    </div>
  )
}
