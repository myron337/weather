"use client";

import React from "react";
import { asset } from "@/utils/asset";
import classes from "./CountryCard.module.css";
import WeatherDetails from "../weatherDetails/WeatherDetails";
import type { SearchItem } from "@/hooks/useCitySearch";
import type { City } from "@/store/geocoding/geocoding.type";
import { useResolvedCity } from "@/hooks/useResolvedCity";
import { useCityTime } from "@/hooks/useCityTime";
import {
  useGetCurrentWeatherQuery,
  WEATHER_POLLING_INTERVAL,
} from "@/store/weather/weather.api";
import { useAppSelector } from "@/store/hooks";
import { selectTemperatureUnit } from "@/store/settings/settings.selectors";
import { formatTemperature } from "@/utils/temperature";
import { getWeatherCodeInfo } from "@/utils/weatherCode";
import { getContinent } from "@/utils/continent";

const PLACEHOLDER = "--";
const NO_COORDINATES = { latitude: 0, longitude: 0 };
// range of the temperature bar under the reading, °C
const SCALE_MIN = -30;
const SCALE_MAX = 45;
// gap between neighbouring cards rising in
const STAGGER_STEP_MS = 70;

const toScalePercent = (celsius: number) => {
  const ratio = (celsius - SCALE_MIN) / (SCALE_MAX - SCALE_MIN);
  return `${Math.round(Math.min(Math.max(ratio, 0), 1) * 100)}%`;
};

const formatVisibility = (meters: number) =>
  meters >= 1000 ? `${Math.round(meters / 1000)} km` : `${Math.round(meters)} m`;

interface CountryCardProps {
  item: SearchItem;
  onSelect: (city: City) => void;
  // position within the newly shown batch, for the staggered entrance
  index?: number;
}

const CountryCard = ({ item, onSelect, index = 0 }: CountryCardProps) => {
  const { city, isLoading: isCityLoading, isUnresolved } = useResolvedCity(item);
  const coordinates = city?.coordinates ?? null;
  const { data, isError } = useGetCurrentWeatherQuery(
    coordinates ?? NO_COORDINATES,
    { skip: !coordinates, pollingInterval: WEATHER_POLLING_INTERVAL }
  );
  const unit = useAppSelector(selectTemperatureUnit);
  // capitals come with coords only; the weather response knows their zone
  const timezone = city?.timezone || data?.timezone || "";
  const time = useCityTime(timezone || undefined);

  const cityName = city?.name ?? (item.kind === "city" ? item.city.name : item.name);
  const countryName =
    city?.country || (item.kind === "countryCity" ? item.country.name : "");
  const countryCode =
    city?.countryCode ?? (item.kind === "countryCity" ? item.country.code : "");
  const continent = getContinent(timezone, countryCode);
  const info = data ? getWeatherCodeInfo(data.weatherCode) : null;

  const condition = isUnresolved
    ? "Location not found"
    : isError
      ? "Weather unavailable"
      : info?.label ?? (isCityLoading || !data ? "Loading..." : "");

  const isClickable = Boolean(coordinates);
  const handleSelect = () => {
    if (city && isClickable) onSelect({ ...city, timezone });
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSelect();
    }
  };

  const details = [
    {
      icon: "/icons/humidity.svg",
      label: "Humidity",
      value: data ? `${Math.round(data.humidity)}%` : PLACEHOLDER,
    },
    {
      icon: "/icons/wind.svg",
      label: "Wind",
      value: data ? `${Math.round(data.windSpeed)} km/h` : PLACEHOLDER,
    },
    {
      icon: "/icons/uv-index.svg",
      label: "UV Index",
      value: data?.uvIndex != null ? String(Math.round(data.uvIndex)) : PLACEHOLDER,
    },
  ];

  return (
    <div
      className={`${classes.countryCard} ${isClickable ? classes.clickable : classes.disabled}`}
      role="button"
      tabIndex={isClickable ? 0 : -1}
      aria-disabled={!isClickable}
      style={{ "--delay": `${index * STAGGER_STEP_MS}ms` } as React.CSSProperties}
      aria-label={`Show weather for ${cityName}${countryName ? `, ${countryName}` : ""}`}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
    >
      <div className={classes.countryCardContent}>
        <div className={classes.countryCardWrapper}>
          <div className={classes.countryCardFlex}>
            <div className={classes.countryCardHeader}>
              {countryCode && <span>{countryCode}</span>}
              <h5 className={classes.country}>{cityName}</h5>
            </div>
            <p className={classes.cityTime}>
              {[countryName, time].filter(Boolean).join(" · ")}
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={info?.icon ?? "placeholder"}
            className={`${classes.mainImage} ${classes.fadeIn}`}
            src={asset(info?.icon ?? "/icons/partly-cloudy-day.svg")}
            alt={info?.label ?? "Weather icon"}
            width="100"
            height="100"
          />
        </div>
      </div>
      <div className={classes.temperatureWrapper}>
        <p
          key={data ? `t-${data.temperature}-${unit}` : "t-none"}
          className={`${classes.temperature} ${classes.fadeIn}`}
        >
          {data ? formatTemperature(data.temperature, unit) : PLACEHOLDER}
        </p>
        {data && (
          <p
            key={`f-${data.feelsLike}-${unit}`}
            className={`${classes.feelsLike} ${classes.fadeIn}`}
          >
            feels {formatTemperature(data.feelsLike, unit)}
          </p>
        )}
      </div>
      <span
        className={classes.score}
        style={
          {
            "--score": data ? toScalePercent(data.temperature) : "0%",
          } as React.CSSProperties
        }
      ></span>
      <p
        key={condition}
        className={`${classes.weatherCondition} ${classes.fadeIn}`}
      >
        {condition}
      </p>
      <div className={classes.weatherDetails}>
        {details.map((detail) => (
          <WeatherDetails
          key={`${detail.label}-${detail.value}`}
          icon={detail.icon}
          label={detail.label}
          value={detail.value}
          />
        ))}
      </div>
        <p className={classes.divideLine}></p>
      <div className={classes.visibilityWrapper}>
        <p className={classes.visibility}>
          Visibility ·{" "}
          {data?.visibility != null ? formatVisibility(data.visibility) : PLACEHOLDER}
        </p>
        <p className={classes.continent}>{continent}</p>
      </div>
    </div>
  );
};

export default CountryCard;
