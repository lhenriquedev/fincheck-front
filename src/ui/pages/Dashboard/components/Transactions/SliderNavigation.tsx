import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

import { useSwiper } from "swiper/react";

export const SliderNavigation = () => {
  const swiper = useSwiper();

  return (
    <>
      <button
        className="absolute left-0 z-10 flex items-center justify-center w-12 h-12 -translate-y-1/2 to-transparent from-gray-100 bg-gradient-to-r top-1/2"
        onClick={() => swiper.slidePrev()}
      >
        <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
      </button>
      <button
        className="absolute right-0 z-10 flex items-center justify-center w-12 h-12 -translate-y-1/2 to-transparent from-gray-100 bg-gradient-to-l top-1/2"
        onClick={() => swiper.slideNext()}
      >
        <ChevronRightIcon className="w-6 h-6 text-gray-800" />
      </button>
    </>
  );
};
