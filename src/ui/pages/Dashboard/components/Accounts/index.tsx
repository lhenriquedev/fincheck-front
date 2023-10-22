import "swiper/css";

import { Swiper, SwiperSlide } from "swiper/react";

import { AccountCard } from "./AccountCard";
import { AccountsSliderNavigation } from "./AccountsSliderNavigation";
import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { useAccountsController } from "./useAccountsController";

export function Accounts() {
  const { setSliderState, sliderState, windowWidth } = useAccountsController();

  return (
    <div className="flex flex-col w-full h-full px-4 py-8 bg-teal-900 md:p-10 rounded-2xl">
      <div>
        <span className="text-white tracking-[-0.5px] block">Saldo total</span>
        <div className="flex items-center gap-2">
          <strong className="text-2xl tracking-[-1px] text-white">
            {formatCurrency(1000.23)}
          </strong>

          <button className="flex items-center justify-center w-8 h-8">
            <EyeIcon open />
          </button>
        </div>
      </div>

      <div className="flex flex-col justify-end flex-1 mt-10 md:mt-0">
        <div>
          <Swiper
            spaceBetween={16}
            slidesPerView={windowWidth >= 500 ? 2.1 : 1.2}
            onSlideChange={(swiper) =>
              setSliderState({
                isBeginning: swiper.isBeginning,
                isEnd: swiper.isEnd,
              })
            }
          >
            <div
              className="flex items-center justify-between mb-4"
              slot="container-start"
            >
              <strong className="text-white tracking-[-1px] text-lg">
                Minhas contas
              </strong>

              <AccountsSliderNavigation
                isEnd={sliderState.isEnd}
                isBeginning={sliderState.isBeginning}
              />
            </div>

            <SwiperSlide>
              <AccountCard
                color="#7950f2"
                name="Nubank"
                balance={1000.23}
                type="CASH"
              />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard
                color="#333"
                name="XP"
                balance={1200.93}
                type="INVESTMENT"
              />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard
                color="#0f0"
                name="Carteira"
                balance={1200.93}
                type="CASH"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
