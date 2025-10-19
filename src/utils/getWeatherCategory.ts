export const getWeatherCategory = (condition: string) => {
  const text = condition.toLowerCase();

  if (text.includes("sun") || text.includes("clear")) return "sunny";
  if (text.includes("cloud")) return "cloudy";
  if (text.includes("rain") || text.includes("drizzle")) return "rainy";
  if (text.includes("snow")) return "snowy";
  if (text.includes("thunder") || text.includes("storm")) return "stormy";
  if (text.includes("mist") || text.includes("fog")) return "misty";

  return "default";
};
