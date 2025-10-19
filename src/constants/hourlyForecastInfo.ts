import { useWeatherContext } from "@/context/WeatherContext";
import type { Hour } from "@/types/weatherInfo";
import { Thermometer, CloudRain, Eye, Snowflake } from "lucide-react";
import { MdCloud } from "react-icons/md";

export const hourlyInfoItems = [
  {
    icon: Thermometer,
    label: "Feels like",

    value: (data: Hour | null) => {
      const weatherContext = useWeatherContext();
      if (weatherContext.activeIndicator === "C") {
        return `${data?.feelslike_c}°C`;
      } else {
        return `${data?.feelslike_f}°F`;
      }
    },
    subtext: (data: Hour | null) => {
      if (!data) return null;
      const temp = data.feelslike_c;
      if (temp <= 0) return "Freezing cold Dress warmly.";
      if (temp <= 10) return "Quite chilly, grab a jacket";
      if (temp <= 20) return "Comfortable temperature";
      if (temp <= 30) return "Warm and pleasant";
      return "Hot! Stay hydrated";
    },
  },
  {
    icon: MdCloud,
    label: "Cloud Cover",
    value: (data: Hour | null) => `${data?.cloud}%`,
    subtext: (data: Hour | null) => {
      if (!data) return "";
      const cloud = data.cloud;
      if (cloud < 20) return "Mostly clear";
      if (cloud < 60) return "Partly cloudy";
      if (cloud < 90) return "Mostly cloudy";
      return "Overcast sky";
    },
  },
  {
    icon: Snowflake,
    label: "Snow possibility",
    value: (data: Hour | null) => `${data?.chance_of_snow}%`,
    subtext: (data: Hour | null) => {
      if (!data) return "";
      const snow = data.chance_of_snow;
      if (snow < 10) return "No snow expected.";
      if (snow < 50) return "Light snow possible";
      return "High chance of snow!";
    },
  },
  {
    icon: CloudRain,
    label: "Rain possibility",
    value: (data: Hour | null) => `${data?.chance_of_rain}%`,
    subtext: (data: Hour | null) => {
      if (!data) return "";
      const rain = data.chance_of_rain;
      if (rain < 10) return "No rain expected";
      if (rain < 40) return "Slight chance of rain";
      if (rain < 70) return "Possible rain, bring an umbrella";
      return "High chance of rain";
    },
  },
  {
    icon: Eye,
    label: "Visibility",
    value: (data: Hour | null) => `${data?.vis_km} km`,
    subtext: (data: Hour | null) => {
      if (!data) return "";
      const vis = data.vis_km;
      if (vis >= 20) return "Excellent visibility";
      if (vis >= 10) return "Good visibility";
      if (vis >= 5) return "Limited visibility";
      return "Poor visibility, possible fog";
    },
  },
];
