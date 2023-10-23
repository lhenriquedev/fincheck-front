import { useDashboard } from "../../../../../app/contexts/DashboardContext";

export const useTransactionsController = () => {
  const { areValuesVisible } = useDashboard();

  return {
    areValuesVisible,
    isLoading: false,
  };
};
