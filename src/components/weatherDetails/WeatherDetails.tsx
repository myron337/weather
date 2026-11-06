import React from 'react';
import classes from './WeatherDetails.module.css';

interface WeatherDetailsProps {
  icon: string;
  label: string;
  value: string;
}

const WeatherDetails = ({ icon, label, value }: WeatherDetailsProps) => {
  return (
    <div className={classes.weatherDetails}>
      <img src={icon} alt={label} width="32" height="32" />
      <p className={classes.detailLabel}>{label}</p>
      <p className={classes.detailValue}>{value}</p>
    </div>
  );
};

export default WeatherDetails;
