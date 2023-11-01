import { createContext, useCallback, useContext, useState } from "react"

interface DashboardContextProps {
  areValuesVisible: boolean
  isNewAccountModalOpen: boolean
  isNewTransactionModalOpen: boolean
  newTransactionType: "INCOME" | "EXPENSE" | null
  toggleValuesVisibility: () => void
  openNewAccountModal: () => void
  openNewTransactionModal: (type: "INCOME" | "EXPENSE") => void
  closeNewAccountModal: () => void
  closeNewTransactionModal: () => void
}

export const DashboardContext = createContext({} as DashboardContextProps)

export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const [areValuesVisible, setAreValuesVisible] = useState(true)
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false)
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)
  const [newTransactionType, setNewTransactionType] = useState<"INCOME" | "EXPENSE" | null>(null)

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible(prevState => !prevState)
  }, [])

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true)
  }, [])

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false)
  }, [])

  const openNewTransactionModal = useCallback((type: "INCOME" | "EXPENSE") => {
    setNewTransactionType(type)
    setIsNewTransactionModalOpen(true)
  }, [])

  const closeNewTransactionModal = useCallback(() => {
    setNewTransactionType(null)
    setIsNewTransactionModalOpen(false)
  }, [])

  return (
    <DashboardContext.Provider
      value={{
        newTransactionType,
        areValuesVisible,
        toggleValuesVisibility,
        closeNewAccountModal,
        openNewAccountModal,
        isNewAccountModalOpen,
        isNewTransactionModalOpen,
        openNewTransactionModal,
        closeNewTransactionModal,
      }}>
      {children}
    </DashboardContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useDashboard = () => {
  return useContext(DashboardContext)
}
