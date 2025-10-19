import { LoadingOutlined } from "@ant-design/icons";
import { SearchCity } from "./SearchCity/SearchCity";
import { WeatherInfo } from "./WeatherInfo/WeatherInfo";
import { WeatherHistory } from "./WeatherHistory/WeatherHistory";
import { HourlyForecast } from "./HourlyForecast/HourlyForecast";
import { getWeatherCategory } from "../utils/getWeatherCategory";
import { weatherBackgrounds } from "../constants/backgrounds";
import { useWeatherContext } from "../context/WeatherContext";

export const WeatherApp = () => {
  const weatherContext = useWeatherContext();
  const condition = weatherContext.currentCity?.current?.condition?.text || "";
  const category = getWeatherCategory(condition);
  const background = weatherBackgrounds[category];

  console.log(weatherContext.currentCity);
  return (
    <>
      <div style={{ background }} className="layout">
        <SearchCity />

        <main>
          {weatherContext.weatherHistory && <WeatherHistory />}

          {weatherContext.navigateError && (
            <p>{weatherContext.navigateError}</p>
          )}

          {weatherContext.isLoading ? (
            <LoadingOutlined spin className="loader" />
          ) : (
            (weatherContext.currentCity || weatherContext.cityByCoords) && (
              <>
                <WeatherInfo />

                <HourlyForecast />
              </>
            )
          )}
        </main>
      </div>
    </>
  );
};
