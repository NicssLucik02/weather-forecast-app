import { useState } from "react";

export const useTempIndicator = () => {
  const [activeIndicator, setActiveIndicator] = useState<"C" | "F">("C");
  const handleChangeIndicator = (value: "C" | "F") => {
    setActiveIndicator(value);
  };

  return {
    activeIndicator,
    handleChangeIndicator,
  };
};
