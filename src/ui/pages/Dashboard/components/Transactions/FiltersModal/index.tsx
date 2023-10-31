import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

import { Button } from "../../../../../components/Button";
import { Modal } from "../../../../../components/Modal";
import { cn } from "../../../../../../app/utils/cn";
import { useFiltersModal } from "./useFiltersModal";

interface FiltersModalProps {
  open: boolean;
  onClose: () => void;
}

const mockedAccounts = [
  { id: "123asdf", name: "Nubank" },
  { id: "4341asdfasd", name: "XP Investimentos" },
  { id: "1634z", name: "Dinheiro" },
];

export const FiltersModal = ({ onClose, open }: FiltersModalProps) => {
  const {
    handleSelectBankAccount,
    selectedBankAccountId,
    selectedYear,
    handleChangeYear,
  } = useFiltersModal();

  return (
    <Modal open={open} onClose={onClose} title="Filtros">
      <div>
        <span className="text-lg tracking-[-1px] font-bold text-gray-800">
          Conta
        </span>

        <div className="mt-2 space-y-2">
          {mockedAccounts.map((account) => (
            <button
              key={account.id}
              className={cn(
                "w-full p-2 text-left text-gray-800 transition-colors rounded-2xl hover:bg-gray-50",
                account.id === selectedBankAccountId && "!bg-gray-200"
              )}
              onClick={() => handleSelectBankAccount(account.id)}
            >
              {account.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 text-gray-800">
        <span className="text-lg tracking-[-1px] font-bold">Ano</span>

        <div className="flex items-center justify-between mt-2 w-52">
          <button
            className="flex items-center justify-center w-12 h-12"
            onClick={() => handleChangeYear(-1)}
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <div className="flex-1 text-center">
            <span className="text-sm font-medium tracking-[-0.5px]">
              {selectedYear}
            </span>
          </div>
          <button
            className="flex items-center justify-center w-12 h-12"
            onClick={() => handleChangeYear(1)}
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      <Button className="w-full mt-10">Aplicar Filtros</Button>
    </Modal>
  );
};
