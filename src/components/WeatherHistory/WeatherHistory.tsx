import { useWeatherContext } from "@/context/WeatherContext";
import "./weatherHistory.scss";
import { XCircle } from "lucide-react";

export const WeatherHistory: React.FC = () => {
  const weatherContext = useWeatherContext();
  console.log(weatherContext.weatherHistory);
  return (
    <section className="weather-history">
      <ul className="weather-history__list">
        {weatherContext.weatherHistory?.map((item) => (
          <li
            key={item.location?.name}
            className="weather-history__item"
            onClick={() => {
              weatherContext.setSearchCity(item.location?.name);
              weatherContext.handleFindCity({ city: item.location?.name });
            }}
          >
            <p>{item.location?.country}</p>
            <p className="weather-history__item-name">{item.location?.name}</p>
            <div className="weather-history__item-temp">
              <p>
                {weatherContext.activeIndicator === "C"
                  ? `${item.current?.temp_c}°C`
                  : `${item.current?.temp_f}°F`}
              </p>
              <img
                src={item.current?.condition?.icon}
                alt={item.current?.condition?.text}
                className="weather-history__item-icon"
              />
            </div>
            <XCircle
              size={20}
              className="weather-history__item-delete"
              onClick={(event) => {
                event.stopPropagation();
                weatherContext.deleteHistory(item.location.name);
              }}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
