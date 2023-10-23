import { Logo } from "./Logo";
import { Spinner } from "./Spinner";
import { Transition } from "@headlessui/react";

interface LaunchScreenProps {
  isLoading: boolean;
}

export const LaunchScreen = ({ isLoading }: LaunchScreenProps) => {
  return (
    <Transition
      show={isLoading}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-teal-900">
        <div className="flex flex-col items-center gap-4">
          <Logo className="h-10 text-white" />
          <Spinner className="text-teal-900 fill-white" />
        </div>
      </div>
    </Transition>
  );
};
