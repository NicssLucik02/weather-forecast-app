import type { WeatherForecast } from "@/types/weatherInfo";

const API_KEY = "8d293de82001469399f143903251808";

export const findCity = (
  city: string,
  days: number = 5,
): Promise<WeatherForecast> => {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=${days}&aqi=no&alerts=no`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errData) => {
          throw new Error(
            errData.error?.message ||
              `Ошибка ${response.status}: Некорректный запрос`,
          );
        });
      }
      return response.json();
    })
    .then((data) => {
      if (!data?.location?.name) {
        throw new Error("Город не найден или данные некорректны");
      }
      return data as WeatherForecast;
    })
    .catch((error) => {
      console.error("findCity error:", error);
      throw error;
    });
};

export const findCoords = async (
  coords: { lat: number; lon: number },
  days: number = 5,
): Promise<WeatherForecast> => {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${coords.lat},${coords.lon}&days=${days}&aqi=no&alerts=no`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error?.message || `Ошибка ${response.status}`);
    }
    const data = await response.json();

    if (!data?.location?.name) {
      throw new Error("Координаты некорректны или данные не найдены");
    }

    return data as WeatherForecast;
  } catch (error) {
    console.error("findCoords error:", error);
    throw error;
  }
};
