import { useDashboard } from "../../../../../app/contexts/DashboardContext";
import { useState } from "react";

export const useTransactionsController = () => {
  const { areValuesVisible } = useDashboard();

  const [isFiltersModalOpen, setFiltersModalOpen] = useState(false);

  const handleOpenFiltersModal = () => setFiltersModalOpen(true);
  const handleCloseFiltersModal = () => setFiltersModalOpen(false);

  return {
    areValuesVisible,
    isInitialLoading: false,
    isLoading: false,
    transactions: [],
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
  };
};
