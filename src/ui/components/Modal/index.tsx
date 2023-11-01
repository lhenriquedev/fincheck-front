import * as RdxDialog from "@radix-ui/react-dialog";

import { Cross2Icon } from "@radix-ui/react-icons";
import { cn } from "../../../app/utils/cn";

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  title: string;
  rightAction?: React.ReactNode;
  onClose?: () => void;
}

export function Modal({
  open,
  title,
  children,
  rightAction,
  onClose,
}: ModalProps) {
  return (
    <RdxDialog.Root open={open} onOpenChange={onClose}>
      <RdxDialog.Portal>
        <RdxDialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-overlay-show " />
        <RdxDialog.Content
          className={cn(
            "fixed top-[50%] outline-none w-full max-w-[400px] left-[50%] z-[51] shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] translate-x-[-50%] translate-y-[-50%] p-6 space-y-10 bg-white rounded-2xl",
            "data-[state=open]:animate-content-show"
          )}
        >
          <header className="flex items-center justify-between h-12 text-gray-800">
            <button
              className="flex items-center justify-center w-12 h-12 outline-none"
              onClick={onClose}
            >
              <Cross2Icon className="w-6 h-6" />
            </button>
            <span className="text-lg tracking-[-1px] font-bold">{title}</span>
            <div className="flex items-center justify-center w-12 h-12">
              {rightAction}
            </div>
          </header>
          <div>{children}</div>
        </RdxDialog.Content>
      </RdxDialog.Portal>
    </RdxDialog.Root>
  );
}
