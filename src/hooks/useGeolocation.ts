import { useCallback, useState } from "react";
import { findCoords } from "../api/api";
import { useWeatherHistory } from "./useWeatherHistory";
import type { WeatherForecast } from "../types/weatherInfo";

type Props = {
  setIsLoading: (value: boolean) => void;
};

export const useGeolocation = ({ setIsLoading }: Props) => {
  const [cityByCoords, setCityByCoords] = useState<WeatherForecast | null>(
    null,
  );
  const [navigateError, setNavigateError] = useState("");
  const [isActiveGeo, setIsActiveGeo] = useState(false);
  const { weatherHistory, deleteHistory, addCity } = useWeatherHistory();

  const findCityByCoords = useCallback(async () => {
    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const newCoords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };

        try {
          setIsActiveGeo(true);

          const result = await findCoords(newCoords);
          setCityByCoords(result);

          addCity(result);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        setNavigateError(error.message);
        setIsLoading(false);
      },
    );
  }, []);

  return {
    navigateError,
    cityByCoords,
    findCityByCoords,
    isActiveGeo,
    setIsActiveGeo,
    weatherHistory,
    deleteHistory,
    addCity,
  };
};
