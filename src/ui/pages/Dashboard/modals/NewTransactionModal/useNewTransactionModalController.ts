import { useDashboard } from "../../../../../app/contexts/DashboardContext"

export const useNewTransactionModalController = () => {
  const { isNewTransactionModalOpen, closeNewTransactionModal, newTransactionType } = useDashboard()

  return {
    closeNewTransactionModal,
    isNewTransactionModalOpen,
    newTransactionType,
  }
}
