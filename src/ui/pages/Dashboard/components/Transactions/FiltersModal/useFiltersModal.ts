import { useState } from "react";

export const useFiltersModal = () => {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<
    string | null
  >(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleSelectBankAccount = (bankAccountId: string) => {
    setSelectedBankAccountId((prevState) =>
      prevState === bankAccountId ? null : bankAccountId
    );
  };

  const handleChangeYear = (step: number) => {
    setSelectedYear((prevState) => prevState + step);
  };

  return {
    selectedBankAccountId,
    handleSelectBankAccount,
    selectedYear,
    handleChangeYear,
  };
};
