import { useCallback, useState, type ChangeEvent } from "react";
import { findCity } from "../api/api";
import type { WeatherForecast } from "../types/weatherInfo";
import { useGeolocation } from "./useGeolocation";

export const useSearchCity = () => {
  const [currentCity, setCurrentCity] = useState<WeatherForecast | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchCity, setSearchCity] = useState<string>("");
  const [currentError, setCurrentError] = useState<string | null>(null);

  const {
    cityByCoords,
    findCityByCoords,
    navigateError,
    isActiveGeo,
    setIsActiveGeo,
    addCity,
    weatherHistory,
    deleteHistory,
  } = useGeolocation({ setIsLoading });

  const handleSearchCity = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchCity(event.target.value);
      setCurrentError(null);
    },
    [],
  );

  const handleFindCity = useCallback(
    async ({
      city,
      event,
    }: {
      city?: string;
      event?: React.FormEvent<HTMLFormElement>;
    } = {}) => {
      if (event) event.preventDefault();

      const query = city ?? searchCity;

      setIsLoading(true);
      setIsActiveGeo(false);

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const result = await findCity(query);

        addCity(result);

        if (result && result.error) {
          console.error("Ошибка в запросе:", result.error);
          setCurrentError(result.error.message);
          setCurrentCity(null);
          return;
        }

        setCurrentCity(result);
        setCurrentError("");
      } catch (err: unknown) {
        if (err instanceof Error) {
          setCurrentError(err.message);
        } else {
          setCurrentError("Unknown error");
        }

        setCurrentCity(null);
      } finally {
        setIsLoading(false);
        setSearchCity("");
      }
    },
    [searchCity, addCity],
  );

  return {
    currentCity,
    searchCity,
    setSearchCity,
    isLoading,
    currentError,
    handleSearchCity,
    handleFindCity,
    cityByCoords,
    findCityByCoords,
    navigateError,
    isActiveGeo,
    weatherHistory,
    deleteHistory,
    setIsLoading,
  };
};
