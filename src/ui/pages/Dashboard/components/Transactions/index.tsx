import { Swiper, SwiperSlide } from "swiper/react";

import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { MONTHS } from "../../../../../app/config/constants";
import { SliderNavigation } from "./SliderNavigation";
import { SliderOption } from "./SliderOption";
import { Spinner } from "../../../../components/Spinner";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { cn } from "../../../../../app/utils/cn";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { useTransactionsController } from "./useTransactionsController";

export function Transactions() {
  const { areValuesVisible, isLoading } = useTransactionsController();

  return (
    <div className="flex flex-col w-full h-full p-10 bg-gray-100 rounded-2xl">
      {isLoading && (
        <div className="flex items-center justify-center w-full h-full">
          <Spinner className="w-10 h-10" />
        </div>
      )}

      {!isLoading && (
        <>
          <header>
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-2">
                <TransactionsIcon />
                <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">
                  Transações
                </span>
                <ChevronDownIcon className="text-gray-900" />
              </button>

              <button>
                <FilterIcon />
              </button>
            </div>

            <div className="relative mt-6">
              <Swiper centeredSlides slidesPerView={3}>
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

          <div className="flex-1 mt-4 space-y-2 overflow-y-auto">
            <div className="flex items-center justify-between gap-4 p-4 bg-white rounded-2xl">
              <div className="flex items-center flex-1 gap-3">
                <CategoryIcon type="expense" />

                <div className="flex flex-col">
                  <strong className="font-bold tracking-[-0.5px]">
                    Almoço
                  </strong>
                  <span className="text-sm text-gray-600">04/06/2023</span>
                </div>
              </div>
              <span
                className={cn(
                  "text-red-800 tracking-[-0.5px] font-medium",
                  !areValuesVisible && "blur-sm"
                )}
              >
                - {formatCurrency(123.44)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 p-4 bg-white rounded-2xl">
              <div className="flex items-center flex-1 gap-3">
                <CategoryIcon type="income" />

                <div className="flex flex-col">
                  <strong className="font-bold tracking-[-0.5px]">
                    Almoço
                  </strong>
                  <span className="text-sm text-gray-600">04/06/2023</span>
                </div>
              </div>
              <span
                className={cn(
                  "text-green-800 tracking-[-0.5px] font-medium",
                  !areValuesVisible && "blur-sm"
                )}
              >
                - {formatCurrency(2500.44)}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
