import { Wind } from "lucide-react";
import "./windCompas.scss";
import type { Theme } from "@/types/weatherInfo";

type Props = {
  windDegree: number | undefined;
  theme: Theme;
  windSpeed: number | undefined;
};
export const WindCompas: React.FC<Props> = ({
  windDegree,
  theme,
  windSpeed,
}) => {
  return (
    <div
      style={{
        backgroundColor: theme.background,
        color: theme.color,
        backdropFilter: "blur(8px)",
      }}
      className="wind__info"
    >
      <p className="wind__info-label">
        <Wind size={15} />
        Wind
      </p>
      <div className="wind-compas">
        <span className="wind-compas__north">N</span>
        <span className="wind-compas__east">E</span>
        <span className="wind-compas__south">S</span>
        <span className="wind-compas__west">W</span>

        <div
          style={{ transform: `rotate(${(windDegree ?? 0) + 180}deg)` }}
          className="wind-compas__arrow"
        />
      </div>
      <p className="wind__info-subtitle">gusts of wind: {windSpeed} mph </p>
    </div>
  );
};
