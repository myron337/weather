import React from "react";
import classes from "./CountryCard.module.css";
import WeatherDetails from "../weatherDetails/WeatherDetails";

interface CountryCardProps {
  humidity: string;
  wind: string;
  uvIndex: string;
}

const CountryCard = ({ humidity, wind, uvIndex }: CountryCardProps) => {
  const details = [
    { icon: "/icons/humidity.svg", label: "Humidity", value: humidity },
    { icon: "/icons/wind.svg", label: "Wind", value: wind },
    { icon: "/icons/uv-index.svg", label: "UV Index", value: uvIndex },
  ];

  return (
    <div className={classes.countryCard}>
      <div className={classes.countryCardContent}>
        <div className={classes.countryCardWrapper}>
          <div className={classes.countryCardFlex}>
            <div className={classes.countryCardHeader}>
              <span>NO</span>
              <h5 className={classes.country}>Norway</h5>
            </div>
            <p className={classes.cityTime}>Oslo · 14:32</p>
          </div>
          <img
            className={classes.mainImage}
            src="/icons/snow.svg"
            alt="Norway Flag"
            width="100"
            height="100"
          />
        </div>
      </div>
      <div className={classes.temperatureWrapper}>
        <p className={classes.temperature}>-4°C</p>
        <p className={classes.feelsLike}>feels -9°C</p>
      </div>
      <span className={classes.score}></span>
      <p className={classes.weatherCondition}>Snowy</p>
      <p className={classes.divideLine}></p>
      <div className={classes.weatherDetails}>
        {details.map((detail) => (
          <WeatherDetails
            key={detail.label}
            icon={detail.icon}
            label={detail.label}
            value={detail.value}
          />
        ))}
      </div>
      <div className={classes.visibilityWrapper}>
        <p className={classes.visibility}>Visibility · 8 km</p>
        <p className={classes.continent}>Europe</p>
      </div>
    </div>
  );
};

export default CountryCard;
