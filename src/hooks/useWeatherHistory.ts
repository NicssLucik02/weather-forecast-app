import { useEffect, useState } from "react";
import type { WeatherForecast } from "../types/weatherInfo";

export const useWeatherHistory = () => {
  const [weatherHistory, setWeatherHistory] = useState<WeatherForecast[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("weatherHistory");
    if (data) {
      try {
        const parsed = JSON.parse(data);
        const valid = (Array.isArray(parsed) ? parsed : []).filter(
          (item): item is WeatherForecast =>
            item &&
            typeof item === "object" &&
            item.location &&
            typeof item.location.name === "string",
        );
        setWeatherHistory(valid);
      } catch (e) {
        console.error("Ошибка парсинга weatherHistory:", e);
        localStorage.removeItem("weatherHistory");
        setWeatherHistory([]);
      }
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
        (item) => item.location?.name !== city.location.name,
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
