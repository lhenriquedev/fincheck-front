import { ComponentProps } from 'react'
import { Spinner } from './Spinner'
import { cn } from '../../app/utils/cn'

interface ButtonProps extends ComponentProps<'button'> {
  isLoading?: boolean
  variant?: 'danger' | 'ghost'
}

export const Button = ({
  className,
  isLoading,
  disabled,
  children,
  variant,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={isLoading || disabled}
      className={cn(
        'h-12 px-6 font-medium flex items-center justify-center text-white transition-all bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed rounded-2xl active:scale-95',
        className,
        variant === 'danger' && 'bg-red-900 hover:bg-red-800',
        variant === 'ghost' &&
          'bg-transparent border border-gray-800 text-gray-800 hover:bg-gray-800/5'
      )}
      {...props}>
      {!isLoading && children}
      {isLoading && <Spinner />}
    </button>
  )
}
