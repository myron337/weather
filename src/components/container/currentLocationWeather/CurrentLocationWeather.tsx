import React from "react";
import classes from "./CurrentLocationWeather.module.css";

const CurrentLocationWeather = () => {
  return (
    <div className={classes.currentLocationWeather}>
      <img
        src="/icons/partly-cloudy-day.svg"
        alt="Weather Icon"
        className={classes.weatherIcon}
        height="130"
        width="180"
      />
      <div>
        <p className={classes.temperature}>19°C</p>
        <p className={classes.condition}>Partly Cloudy · Feels like 18°C</p>
      </div>

      <span className={classes.divider}></span>

      <div className={classes.humidityWrapper}>
        <p className={classes.humidity}>Humidity</p>
        <p className={classes.humidityValue}>58%</p>
        </div>

      <div className={classes.windWrapper}>
        <p className={classes.wind}>Wind</p>
        <p className={classes.windValue}>22 km/h</p>
      </div>
    </div>
  );
};

export default CurrentLocationWeather;
