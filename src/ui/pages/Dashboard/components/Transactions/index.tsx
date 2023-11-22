import { Swiper, SwiperSlide } from 'swiper/react'

import { CategoryIcon } from '../../../../components/icons/categories/CategoryIcon'
import { FilterIcon } from '../../../../components/icons/FilterIcon'
import { FiltersModal } from './FiltersModal'
import { MONTHS } from '../../../../../app/config/constants'
import { SliderNavigation } from './SliderNavigation'
import { SliderOption } from './SliderOption'
import { Spinner } from '../../../../components/Spinner'
import { TransactionTypeDropdown } from './TransactionTypeDropdown'
import { cn } from '../../../../../app/utils/cn'
import emptyStateImage from '../../../../../assets/empty-state.svg'
import { formatCurrency } from '../../../../../app/utils/formatCurrency'
import { formatDate } from '../../../../../app/utils/formatDate'
import { useTransactionsController } from './useTransactionsController'

export function Transactions() {
  const {
    areValuesVisible,
    isLoading,
    isInitialLoading,
    transactions,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    isFiltersModalOpen,
    handleChangeFilters,
    filters,
    handleApplyFilters,
  } = useTransactionsController()

  const hasTransactions = transactions.length > 0

  return (
    <div className='flex flex-col w-full h-full p-10 bg-gray-100 rounded-2xl'>
      {isInitialLoading && (
        <div className='flex items-center justify-center w-full h-full'>
          <Spinner className='w-10 h-10' />
        </div>
      )}

      {!isInitialLoading && (
        <>
          <FiltersModal
            open={isFiltersModalOpen}
            onClose={handleCloseFiltersModal}
            onApplyFilters={handleApplyFilters}
          />

          <header>
            <div className='flex items-center justify-between'>
              <TransactionTypeDropdown
                onSelect={type => handleChangeFilters('type')(type)}
                selectedType={filters.type}
              />

              <button onClick={handleOpenFiltersModal}>
                <FilterIcon />
              </button>
            </div>

            <div className='relative mt-6'>
              <Swiper
                centeredSlides
                slidesPerView={3}
                initialSlide={filters.month}
                onSlideChange={swiper => {
                  handleChangeFilters('month')(swiper.realIndex)
                }}>
                <SliderNavigation />
                {MONTHS.map((month, index) => (
                  <SwiperSlide key={month}>
                    {({ isActive }) => (
                      <SliderOption
                        isActive={isActive}
                        month={month}
                        index={index}
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>
          <div className='flex-1 mt-4 space-y-2 overflow-y-auto'>
            {isLoading && (
              <div className='flex flex-col items-center justify-center w-full h-full'>
                <Spinner className='w-10 h-10' />
              </div>
            )}

            {!hasTransactions && !isLoading && (
              <div className='flex flex-col items-center justify-center w-full h-full'>
                <img
                  src={emptyStateImage}
                  alt=''
                />
                <p className='text-gray-700'>Não encontramos nenhuma transação!</p>
              </div>
            )}

            {hasTransactions &&
              !isLoading &&
              transactions.map(transaction => (
                <div
                  key={transaction.id}
                  className='flex items-center justify-between gap-4 p-4 bg-white rounded-2xl'>
                  <div className='flex items-center flex-1 gap-3'>
                    <CategoryIcon
                      type={transaction.type === 'EXPENSE' ? 'expense' : 'income'}
                      category={transaction.category?.icon}
                    />

                    <div className='flex flex-col'>
                      <strong className='font-bold tracking-[-0.5px]'>{transaction.name}</strong>
                      <span className='text-sm text-gray-600'>
                        {formatDate(new Date(transaction.date))}
                      </span>
                    </div>
                  </div>
                  <span
                    className={cn(
                      'tracking-[-0.5px] font-medium',
                      !areValuesVisible && 'blur-sm',
                      transaction.type === 'EXPENSE' ? 'text-red-800' : 'text-green-800'
                    )}>
                    {transaction.type === 'EXPENSE' ? '-' : '+'} {formatCurrency(transaction.value)}
                  </span>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  )
}
