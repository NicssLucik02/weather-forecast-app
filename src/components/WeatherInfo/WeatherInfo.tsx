import "./weatherInfo.scss";
import { useWeatherContext } from "@/context/WeatherContext";

export const WeatherInfo: React.FC = () => {
  const weatherContext = useWeatherContext();

  const city = weatherContext.isActiveGeo
    ? weatherContext.cityByCoords
    : weatherContext.currentCity;

  if (!city) {
    return null;
  }

  return (
    <div className="weather-info">
      <h2 className="weather-info__country">{city.location?.country}</h2>
      <h2 className="weather-info__city">{city.location?.name}</h2>

      <div className="weather-info__temp">
        {weatherContext.activeIndicator === "C"
          ? `${Math.round(city.current.temp_c)}°C`
          : `${Math.round(city.current.temp_f)}°F`}

        <img
          src={city.current.condition.icon}
          alt="weather"
          className="weather-info__icon"
        />

        {weatherContext.activeIndicator === "C" ? (
          <button
            type="button"
            className="info__button-temp"
            onClick={() => weatherContext.handleChangeIndicator("F")}
          >
            °F
          </button>
        ) : (
          <button
            type="button"
            className="info__button-temp"
            onClick={() => weatherContext.handleChangeIndicator("C")}
          >
            °C
          </button>
        )}
      </div>
      <div className="weather-info__description">
        {city.current.condition.text}
      </div>
    </div>
  );
};
