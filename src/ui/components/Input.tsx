import { ComponentProps, forwardRef } from "react";

import { CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "../../app/utils/cn";

interface InputProps extends ComponentProps<"input"> {
  name: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, name, id, error, className, ...props }, ref) => {
    const inputId = id ?? name;

    return (
      <div className="relative">
        <input
          {...props}
          ref={ref}
          name={name}
          id={inputId}
          placeholder=" "
          className={cn(
            "peer focus:border-gray-900 transition-all h-[52px] pt-4 outline-none placeholder-shown:pt-0 w-full text-gray-800 bg-white rounded-lg border border-gray-500 px-3",
            error && "!border-red-900",
            className
          )}
        />
        <label
          htmlFor={inputId}
          className="absolute text-xs left-[13px] top-2 pointer-events-none text-gray-700 peer-placeholder-shown:text-base  peer-placeholder-shown:top-3.5 transition-all"
        >
          {placeholder}
        </label>

        {error && (
          <div className="flex items-center gap-2 mt-2 text-red-900">
            <CrossCircledIcon />
            <p className="text-xs">{error}</p>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
