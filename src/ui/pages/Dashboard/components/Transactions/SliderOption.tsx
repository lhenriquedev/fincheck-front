import { cn } from "../../../../../app/utils/cn";
import { useSwiper } from "swiper/react";

interface SliderOptionProp {
  month: string;
  isActive: boolean;
  index: number;
}

export const SliderOption = ({ isActive, month, index }: SliderOptionProp) => {
  const swiper = useSwiper();

  return (
    <button
      className={cn(
        "w-full h-12 text-sm rounded-full text-gray-800 tracking-[-0.5px] font-medium",
        isActive && "bg-white"
      )}
      onClick={() => swiper.slideTo(index)}
    >
      {month}
    </button>
  );
};
