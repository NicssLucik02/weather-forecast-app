import { useEffect, useState } from "react";
import { HourlyForecastInfo } from "../HourlyForecastInfo/HourlyForecastInfo";
import "./hourlyForecast.scss";
import { type Hour } from "../../types/weatherInfo";
import { getWeatherCategory } from "../../utils/getWeatherCategory";
import { menuThemes } from "../../constants/backgrounds";
import { useWeatherContext } from "@/context/WeatherContext";

export const HourlyForecast: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [currentHour, setCurrentHour] = useState<Hour | null>(null);
  const weatherContext = useWeatherContext();

  const forecastSource =
    weatherContext.currentCity || weatherContext.cityByCoords;
  const forecastDay = forecastSource?.forecast?.forecastday;

  const allHours = forecastDay?.flatMap((day) => day.hour);

  const currentTime = new Date();
  const currentHourIndex = allHours?.findIndex((h) => {
    const hourTime = new Date(h.time);
    return (
      hourTime.getDate() === currentTime.getDate() &&
      hourTime.getHours() === currentTime.getHours()
    );
  });

  useEffect(() => {
    if (!allHours?.length) return;
    setCurrentHour(
      currentHourIndex !== -1 ? allHours[currentHourIndex] : allHours[0],
    );
  }, [weatherContext.currentCity]);

  const visibleHours =
    currentHourIndex !== -1 ? allHours?.slice(currentHourIndex) : allHours;

  const condition = weatherContext.currentCity?.current?.condition?.text || "";
  const category = getWeatherCategory(condition) ?? "default";
  const theme = menuThemes[category];

  return (
    <section className="forecast-hourly">
      <div
        className="forecast-hourly__wrapper"
        style={{
          backgroundColor: theme.wrapper,
          color: theme.color,
        }}
      >
        {visibleHours?.map((hourItem, index) => {
          const formattedTime = hourItem.time.toString().split(" ");
          return (
            <div
              key={hourItem.time_epoch}
              onClick={() => {
                setActiveTab(index);
                setCurrentHour(hourItem);
              }}
              style={
                activeTab === index
                  ? {
                      backgroundColor: theme.active,
                      color: theme.color,
                    }
                  : {}
              }
              className={
                activeTab !== index
                  ? "forecast-hourly__item"
                  : "forecast-hourly__item-active"
              }
            >
              <p className="forecast-hourly__item-hour">{formattedTime[1]}</p>
              <img
                src={hourItem.condition.icon}
                className="forecast-hourly__item-icon"
                alt={hourItem.condition.text}
              />
              <p className="forecast-hourly__item-rain">
                {hourItem.chance_of_rain}%
                <img src="" alt="" />
              </p>
              <p className="forecast-hourly__item-temp">
                {weatherContext.activeIndicator === "C"
                  ? `${hourItem.temp_c}°C`
                  : `${hourItem.temp_f}°F`}
              </p>
            </div>
          );
        })}
      </div>

      <HourlyForecastInfo currentHour={currentHour} theme={theme} />
    </section>
  );
};
