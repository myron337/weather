"use client";

import React from "react";
import classes from "./GraphContainer.module.css";
import GraphItem from "../graphItem/GraphItem";
import {
  useGetWorldExtremesQuery,
  WORLD_EXTREMES_POLLING_INTERVAL,
} from "@/store/weather/weather.api";
import type { WorldExtreme } from "@/store/weather/weather.type";
import { useAppSelector } from "@/store/hooks";
import { selectTemperatureUnit } from "@/store/settings/settings.selectors";
import { formatTemperature } from "@/utils/temperature";

const PLACEHOLDER = "--";

const GraphContainer = () => {
  const { data, isError } = useGetWorldExtremesQuery(undefined, {
    pollingInterval: WORLD_EXTREMES_POLLING_INTERVAL,
  });
  const unit = useAppSelector(selectTemperatureUnit);

  const fallbackCountry = isError ? "Unavailable" : "Loading...";

  const item = (
    score: string,
    imgSrc: string,
    extreme: WorldExtreme | undefined,
    format: (value: number) => string
  ) => (
    <GraphItem
      score={score}
      imgSrc={imgSrc}
      value={extreme ? format(extreme.value) : PLACEHOLDER}
      country={extreme?.country ?? fallbackCountry}
      title={extreme ? `Measured in ${extreme.capital}` : undefined}
    />
  );

  return (
    <div className={classes.graphContainer}>
      {item("Hottest", "/icons/thermometer-warmer.svg", data?.hottest, (v) =>
        formatTemperature(v, unit)
      )}
      {item("Coldest", "/icons/thermometer-colder.svg", data?.coldest, (v) =>
        formatTemperature(v, unit)
      )}
      {item("Windiest", "/icons/wind.svg", data?.windiest, (v) =>
        `${Math.round(v)} km/h`
      )}
      {item("Most humid", "/icons/humidity.svg", data?.mostHumid, (v) =>
        `${Math.round(v)}%`
      )}
    </div>
  );
};

export default GraphContainer;
