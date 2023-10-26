import { DropdownMenu } from "./DropdownMenu";
import { ExitIcon } from "@radix-ui/react-icons";
import { useAuth } from "../../app/contexts/AuthContext";

export const UserMenu = () => {
  const { signout } = useAuth();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="flex items-center justify-center w-12 h-12 border border-teal-100 rounded-full bg-teal-50">
          <span className="text-sm tracking-[-0.5px] font-medium text-teal-900">
            LH
          </span>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-32">
        <DropdownMenu.Item
          className="flex items-center justify-between"
          onSelect={() => signout()}
        >
          Sair
          <ExitIcon className="w-4 h-4" />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
