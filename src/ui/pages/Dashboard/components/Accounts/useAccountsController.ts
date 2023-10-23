import { useDashboard } from "../../../../../app/contexts/DashboardContext";
import { useState } from "react";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";

export const useAccountsController = () => {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const windowWidth = useWindowWidth();
  const { areValuesVisible, toggleValuesVisibility } = useDashboard();

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading: false,
  };
};
