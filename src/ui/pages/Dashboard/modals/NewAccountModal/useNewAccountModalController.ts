import { useDashboard } from "../../../../../app/contexts/DashboardContext";

export const useNewAccountModalController = () => {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();

  return {
    isNewAccountModalOpen,
    closeNewAccountModal,
  };
};
