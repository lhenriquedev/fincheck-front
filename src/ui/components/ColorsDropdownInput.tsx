import { ChevronDownIcon, CrossCircledIcon } from '@radix-ui/react-icons'

import { ColorIcon } from './icons/ColorIcon'
import { DropdownMenu } from './DropdownMenu'
import { cn } from '../../app/utils/cn'
import { useState } from 'react'

interface ColorsDropdownInputProps {
  error?: string
  className?: string
  value?: string
  onChange?: (value: string) => void
}

type Color = {
  color: string
  bg: string
}

const colors: Color[] = [
  { color: '#868E96', bg: '#F8F9FA' },
  { color: '#FA5252', bg: '#FFF5F5' },
  { color: '#E64980', bg: '#FFF0F6' },
  { color: '#BE4BDB', bg: '#F8F0FC' },
  { color: '#7950F2', bg: '#F3F0FF' },
  { color: '#4C6EF5', bg: '#EDF2FF' },
  { color: '#228BE6', bg: '#E7F5FF' },
  { color: '#15AABF', bg: '#E3FAFC' },
  { color: '#12B886', bg: '#E6FCF5' },
  { color: '#40C057', bg: '#EBFBEE' },
  { color: '#82C91E', bg: '#F4FCE3' },
  { color: '#FAB005', bg: '#FFF9DB' },
  { color: '#FD7E14', bg: '#FFF4E6' },
  { color: '#212529', bg: '#F8F9FA' },
]

export const ColorsDropdownInput = ({
  className,
  error,
  onChange,
  value,
}: ColorsDropdownInputProps) => {
  const [selectedColor, setSelectedColor] = useState<null | Color>(() => {
    if (!value) return null
    return colors.find(c => c.color === value) ?? null
  })

  const handleSelect = (color: Color) => {
    setSelectedColor(color)
    onChange?.(color.color)
  }

  return (
    <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button
            className={cn(
              'focus:border-gray-900 relative text-left transition-all h-[52px] outline-none w-full text-gray-700 bg-white rounded-lg border border-gray-500 px-3',
              error && '!border-red-900',
              className
            )}>
            Cor
            <div className='absolute -translate-y-1/2 right-3 top-1/2'>
              {!selectedColor && <ChevronDownIcon className='w-6 h-6 text-gray-800 ' />}
              {selectedColor && (
                <ColorIcon
                  color={selectedColor.color}
                  bg={selectedColor.bg}
                />
              )}
            </div>
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className='grid grid-cols-4'>
          {colors.map(color => (
            <DropdownMenu.Item
              key={color.color}
              onSelect={() => handleSelect(color)}>
              <ColorIcon
                color={color.color}
                bg={color.bg}
              />
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      {error && (
        <div className='flex items-center gap-2 mt-2 text-red-900'>
          <CrossCircledIcon />
          <p className='text-xs'>{error}</p>
        </div>
      )}
    </div>
  )
}
