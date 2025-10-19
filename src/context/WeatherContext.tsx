import React, {
  createContext,
  useContext,
  useMemo,
  type ChangeEvent,
  type ReactNode,
} from "react";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useSearchCity } from "@/hooks/useSearchCity";
import { useWeatherHistory } from "@/hooks/useWeatherHistory";
import type { WeatherForecast } from "@/types/weatherInfo";
import { useTempIndicator } from "@/hooks/useTempIndicator";

type WeatherContextType = {
  cityByCoords: WeatherForecast | null;
  navigateError: string;
  isActiveGeo: boolean;
  findCityByCoords: () => Promise<void>;
  setIsActiveGeo: React.Dispatch<React.SetStateAction<boolean>>;
  currentCity: WeatherForecast | null;
  searchCity: string;
  setSearchCity: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  currentError: string | null;
  handleSearchCity: (event: ChangeEvent<HTMLInputElement>) => void;
  handleFindCity: (args?: {
    city?: string;
    event?: React.FormEvent<HTMLFormElement>;
  }) => Promise<void>;
  weatherHistory: WeatherForecast[];
  deleteHistory: (city: string) => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  addCity: (city: WeatherForecast) => void;
  activeIndicator: "C" | "F";
  handleChangeIndicator: (value: "C" | "F") => void;
};

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const WeatherProvider = ({ children }: Props) => {
  const searchCity = useSearchCity();
  const geoLocation = useGeolocation({ setIsLoading: searchCity.setIsLoading });
  const weatherHistory = useWeatherHistory();
  const tempIndicator = useTempIndicator();

  const value = useMemo(
    () => ({
      ...geoLocation,
      ...searchCity,
      ...weatherHistory,
      ...tempIndicator,
    }),
    [geoLocation, searchCity, weatherHistory],
  );

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeatherContext must be used within a WeatherProvider");
  }
  return context;
};
