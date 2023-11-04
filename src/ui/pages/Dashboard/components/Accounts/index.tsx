import 'swiper/css'

import { Swiper, SwiperSlide } from 'swiper/react'

import { AccountCard } from './AccountCard'
import { AccountsSliderNavigation } from './SliderNavigation'
import { EyeIcon } from '../../../../components/icons/EyeIcon'
import { PlusIcon } from '@radix-ui/react-icons'
import { Spinner } from '../../../../components/Spinner'
import { cn } from '../../../../../app/utils/cn'
import { formatCurrency } from '../../../../../app/utils/formatCurrency'
import { useAccountsController } from './useAccountsController'

export function Accounts() {
  const {
    setSliderState,
    sliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading,
    accounts,
    openNewAccountModal,
    currentBalance,
  } = useAccountsController()

  return (
    <div className='flex flex-col w-full h-full px-4 py-8 bg-teal-900 md:p-10 rounded-2xl'>
      {isLoading && (
        <div className='flex items-center justify-center w-full h-full'>
          <Spinner className='w-10 h-10 text-teal-950/50 fill-white' />
        </div>
      )}
      {!isLoading && (
        <>
          <div>
            <span className='text-white tracking-[-0.5px] block'>Saldo total</span>
            <div className='flex items-center gap-2'>
              <strong
                className={cn(
                  'text-2xl tracking-[-1px] text-white',
                  !areValuesVisible && 'blur-md'
                )}>
                {formatCurrency(currentBalance ?? 0)}
              </strong>

              <button
                className='flex items-center justify-center w-8 h-8'
                onClick={toggleValuesVisibility}>
                <EyeIcon open={!areValuesVisible} />
              </button>
            </div>
          </div>

          <div className='flex flex-col justify-end flex-1 mt-10 md:mt-0'>
            {accounts.length === 0 && (
              <>
                <div
                  className='mb-4'
                  slot='container-start'>
                  <strong className='text-white tracking-[-1px] text-lg'>Minhas contas</strong>
                </div>

                <button
                  className='flex flex-col items-center justify-center w-full gap-4 mt-4 text-white border-2 border-teal-600 border-dashed h-52 rounded-2xl'
                  onClick={openNewAccountModal}>
                  <div className='flex items-center justify-center border-2 border-white border-dashed rounded-full w-11 h-11'>
                    <PlusIcon className='w-6 h-6' />
                  </div>
                  <span className='font-medium tracking-[-0.5px] block text-center w-32'>
                    Cadastre uma nova conta
                  </span>
                </button>
              </>
            )}

            {accounts.length > 0 && (
              <div>
                <Swiper
                  spaceBetween={16}
                  slidesPerView={windowWidth >= 500 ? 2.1 : 1.2}
                  onSlideChange={swiper =>
                    setSliderState({
                      isBeginning: swiper.isBeginning,
                      isEnd: swiper.isEnd,
                    })
                  }>
                  <div
                    className='flex items-center justify-between mb-4'
                    slot='container-start'>
                    <strong className='text-white tracking-[-1px] text-lg'>Minhas contas</strong>

                    <AccountsSliderNavigation
                      isEnd={sliderState.isEnd}
                      isBeginning={sliderState.isBeginning}
                    />
                  </div>

                  {accounts.map(account => (
                    <SwiperSlide key={account.id}>
                      <AccountCard data={account} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
