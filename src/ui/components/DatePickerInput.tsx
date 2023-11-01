import { CrossCircledIcon } from "@radix-ui/react-icons"
import { DatePicker } from "./DatePicker"
import { Popover } from "./Popover"
import { cn } from "../../app/utils/cn"
import { formatDate } from "../../app/utils/formatDate"
import { useState } from "react"

interface DatePickerInputProps {
  error?: string
  className?: string
}

export const DatePickerInput = ({ className, error }: DatePickerInputProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date())

  return (
    <div>
      <Popover.Root>
        <Popover.Trigger>
          <button
            type='button'
            className={cn(
              "focus:border-gray-900 relative pt-4 text-left transition-all h-[52px] outline-none w-full text-gray-700 bg-white rounded-lg border border-gray-500 px-3",
              error && "!border-red-900",
              className
            )}>
            <span className='text-xs text-gray-700 absolute left-[13px] top-2 pointer-events-none'>
              Data
            </span>

            <span>{formatDate(selectedDate)}</span>
          </button>
        </Popover.Trigger>

        <Popover.Content>
          <DatePicker
            value={selectedDate}
            onChange={date => setSelectedDate(date)}
          />
        </Popover.Content>
      </Popover.Root>

      {error && (
        <div className='flex items-center gap-2 mt-2 text-red-900'>
          <CrossCircledIcon />
          <p className='text-xs'>{error}</p>
        </div>
      )}
    </div>
  )
}
