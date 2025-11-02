import React from "react";
import "./searchCity.scss";
import { useWeatherContext } from "@/context/WeatherContext";
import { MapPin } from "lucide-react";
const SearchCityComponent: React.FC = () => {
  const weatherContext = useWeatherContext();
  return (
    <>
      <header className="header">
        <form
          onSubmit={(event) => weatherContext.handleFindCity({ event })}
          className="header__form"
        >
          <div className="search__input-container">
            <input
              type="text"
              className="search__input"
              placeholder="Find a city"
              value={weatherContext.searchCity}
              onChange={weatherContext.handleSearchCity}
            />

            <button type="submit" className="search__button">
              Search
            </button>
          </div>
        </form>
        <button
          className="search__city-coords"
          onClick={weatherContext.findCityByCoords}
        >
          Home
          <MapPin className="search__city-coords__icon" />
        </button>
      </header>
      {weatherContext.currentError && (
        <div className="error">{weatherContext.currentError}</div>
      )}
    </>
  );
};

export const SearchCity = React.memo(SearchCityComponent);
