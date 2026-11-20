import React from "react";
import classes from "./CurrentLocationWeather.module.css";
import {
  useGetCurrentWeatherQuery,
  WEATHER_POLLING_INTERVAL,
} from "@/store/weather/weather.api";
import { getWeatherCodeInfo } from "@/utils/weatherCode";
import type { Coordinates } from "@/store/geocoding/geocoding.type";
import { useAppSelector } from "@/store/hooks";
import { selectTemperatureUnit } from "@/store/settings/settings.selectors";
import { formatTemperature } from "@/utils/temperature";

const PLACEHOLDER = "--";
// any value: only used while the query is skipped
const NO_COORDINATES: Coordinates = { latitude: 0, longitude: 0 };

interface CurrentLocationWeatherProps {
  coordinates: Coordinates | null;
}

const CurrentLocationWeather = ({ coordinates }: CurrentLocationWeatherProps) => {
  const { data, isError } = useGetCurrentWeatherQuery(
    coordinates ?? NO_COORDINATES,
    { skip: !coordinates, pollingInterval: WEATHER_POLLING_INTERVAL }
  );

  const unit = useAppSelector(selectTemperatureUnit);
  const info = data ? getWeatherCodeInfo(data.weatherCode) : null;

  const temperature = data ? formatTemperature(data.temperature, unit) : PLACEHOLDER;
  const condition = isError
    ? "Weather unavailable"
    : data && info
      ? `${info.label} · Feels like ${formatTemperature(data.feelsLike, unit)}`
      : "Loading...";
  const humidity = data ? `${Math.round(data.humidity)}%` : PLACEHOLDER;
  const wind = data ? `${Math.round(data.windSpeed)} km/h` : PLACEHOLDER;
  const icon = info?.icon ?? "/icons/partly-cloudy-day.svg";

  // keys remount on change so the fade-in replays
  return (
    <div className={classes.currentLocationWeather}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={icon}
        src={icon}
        alt={info?.label ?? "Weather icon"}
        className={`${classes.weatherIcon} ${classes.fadeIn}`}
        height="130"
        width="180"
      />
      <div>
        <p key={temperature} className={`${classes.temperature} ${classes.fadeIn}`}>
          {temperature}
        </p>
        <p key={condition} className={`${classes.condition} ${classes.fadeIn}`}>
          {condition}
        </p>
      </div>

      <span className={classes.divider}></span>

      <div className={classes.humidityWrapper}>
        <p className={classes.humidity}>Humidity</p>
        <p key={humidity} className={`${classes.humidityValue} ${classes.fadeIn}`}>
          {humidity}
        </p>
      </div>

      <div className={classes.windWrapper}>
        <p className={classes.wind}>Wind</p>
        <p key={wind} className={`${classes.windValue} ${classes.fadeIn}`}>
          {wind}
        </p>
      </div>
    </div>
  );
};

export default CurrentLocationWeather;
