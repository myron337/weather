import type { TemperatureUnit } from "@/store/settings/settings.type";

// source values are always °C (Open-Meteo default)
export const convertTemperature = (celsius: number, unit: TemperatureUnit) =>
  unit === "F" ? (celsius * 9) / 5 + 32 : celsius;

export const formatTemperature = (celsius: number, unit: TemperatureUnit) =>
  `${Math.round(convertTemperature(celsius, unit))}°${unit}`;
