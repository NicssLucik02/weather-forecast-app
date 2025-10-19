import { useEffect, useState } from "react";
import type { WeatherForecast } from "../types/weatherInfo";

export const useWeatherHistory = () => {
  const [weatherHistory, setWeatherHistory] = useState<WeatherForecast[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("weatherHistory");
    if (data) {
      setWeatherHistory(JSON.parse(data));
    }
  }, []);

  const deleteHistory = (city: string) => {
    const newHistory = weatherHistory.filter(
      (item) => item && item.location?.name !== city,
    );
    setWeatherHistory(newHistory);
    localStorage.setItem("weatherHistory", JSON.stringify(newHistory));
  };

  const addCity = (city: WeatherForecast) => {
    setWeatherHistory((prev) => {
      const withoutCity = prev.filter(
        (item) => item.location.name !== city.location.name,
      );
      const updated = [...withoutCity, city];

      localStorage.setItem("weatherHistory", JSON.stringify(updated));
      return updated;
    });
  };
  return {
    weatherHistory,
    deleteHistory,
    addCity,
  };
};
