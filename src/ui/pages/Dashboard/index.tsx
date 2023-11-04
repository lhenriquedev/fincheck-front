import { DashboardContext, DashboardProvider } from '../../../app/contexts/DashboardContext'

import { Accounts } from './components/Accounts'
import { EditAccountModal } from './modals/EditAccountModal'
import { Fab } from './components/Fab'
import { Logo } from '../../components/Logo'
import { NewAccountModal } from './modals/NewAccountModal'
import { NewTransactionModal } from './modals/NewTransactionModal'
import { Transactions } from './components/Transactions'
import { UserMenu } from '../../components/UserMenu'

export const Dashboard = () => {
  return (
    <DashboardProvider>
      <DashboardContext.Consumer>
        {({ accountBeingEdited }) => (
          <div className='flex flex-col w-full h-full gap-4 p-4 md:px-8 md:pt-6 md:pb-8'>
            <header className='flex items-center justify-between h-12'>
              <Logo className='h-6 text-teal-900' />
              <UserMenu />
            </header>

            <main className='flex flex-col flex-1 max-h-full gap-4 md:flex-row'>
              <div className='w-full md:w-1/2'>
                <Accounts />
              </div>
              <div className='w-full md:w-1/2'>
                <Transactions />
              </div>
            </main>

            <Fab />

            {/* Modais */}
            <NewAccountModal />
            <NewTransactionModal />
            {accountBeingEdited && <EditAccountModal />}
          </div>
        )}
      </DashboardContext.Consumer>
    </DashboardProvider>
  )
}
