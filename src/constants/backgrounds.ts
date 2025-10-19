import type { Theme } from "@/types/weatherInfo";

export const weatherBackgrounds = {
  sunny: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
  cloudy: "linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)",
  rainy: "linear-gradient(135deg, #667db6 0%, #0082c8 50%, #0082c8 100%)",
  snowy: "linear-gradient(135deg, #83a4d4 0%, #b6fbff 100%)",
  stormy: "linear-gradient(135deg, #141E30 0%, #243B55 100%)",
  misty: "linear-gradient(135deg, #606c88 0%, #3f4c6b 100%)",
  default: "linear-gradient(135deg, #2980b9, #6dd5fa, #ffffff)",
};

export const menuThemes: Record<
  "sunny" | "cloudy" | "rainy" | "snowy" | "stormy" | "misty" | "default",
  Theme
> = {
  sunny: {
    background: "rgba(255, 230, 170, 0.85)",
    color: "#2c3e50",
    wrapper: "rgba(255, 215, 120, 0.55)",
    active: "rgba(255, 230, 170, 0.85)",
  },
  cloudy: {
    background: "rgba(180, 185, 190, 0.4)",
    color: "#f2f2f2",
    wrapper: "rgba(120, 130, 140, 0.25)",
    active: "rgba(180, 185, 190, 0.4)",
  },
  rainy: {
    background: "rgba(0, 90, 150, 0.55)",
    color: "#eaf6ff",
    wrapper: "rgba(0, 115, 190, 0.35)",
    active: "rgba(0, 90, 150, 0.5)",
  },
  snowy: {
    background: "rgba(235, 250, 255, 0.7)",
    color: "#1e3a5f",
    wrapper: "rgba(210, 240, 255, 0.5)",
    active: "rgba(235, 250, 255, 0.7)",
  },
  stormy: {
    background: "rgba(25, 35, 60, 0.8)",
    color: "#e0e6ff",
    wrapper: "rgba(40, 60, 110, 0.5)",
    active: "rgba(25, 35, 60, 0.8)",
  },
  misty: {
    background: "rgba(80, 90, 110, 0.6)",
    color: "#f1f1f1",
    wrapper: "rgba(100, 110, 130, 0.4)",
    active: "rgba(80, 90, 110, 0.6)",
  },
  default: {
    background: "rgba(45, 90, 160, 0.9)",
    color: "#ffffff",
    wrapper: "rgba(30, 70, 140, 0.6)",
    active: "rgba(45, 90, 160, 0.7)",
  },
};
