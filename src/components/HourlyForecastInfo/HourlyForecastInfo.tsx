import type { Hour, Theme } from "@/types/weatherInfo";
import "./hourlyForecastInfo.scss";
import { hourlyInfoItems } from "../../constants/hourlyForecastInfo";
import { WindCompas } from "../WindCompas/WindCompas";

type Props = {
  currentHour: Hour | null;
  theme: Theme;
};

export const HourlyForecastInfo: React.FC<Props> = ({ currentHour, theme }) => {
  return (
    <div
      className="hourly-forecast__info"
      style={{
        backgroundColor: theme.background,
        color: theme.color,
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="hourly-forecast__info-additional">
        {hourlyInfoItems.map((item) => (
          <div
            key={item.label}
            className="hourly-forecast__info-additional__block"
            style={{
              backgroundColor: theme.background,
              color: theme.color,
              backdropFilter: "blur(8px)",
            }}
          >
            <p className="hourly-forecast__info-additional__block-label">
              <item.icon size={15} /> {item.label}
            </p>

            <p className="hourly-forecast__info-additional__block-value">
              {item.value(currentHour)}
            </p>

            <p className="hourly-forecast__info-additional__block-subtext">
              {item.subtext(currentHour)}
            </p>
          </div>
        ))}

        <WindCompas
          windDegree={currentHour?.wind_degree}
          theme={theme}
          windSpeed={currentHour?.wind_mph}
        />
      </div>
    </div>
  );
};
