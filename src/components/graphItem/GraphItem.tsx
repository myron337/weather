import React from "react";
import classes from "./GraphItem.module.css";

interface GraphItemProps {
  score: string | number;
  temperature: number;
  country: string;
  imgSrc: string;
  isTemperature?: boolean;
  unit?: string;
}

const GraphItem = ({ score, temperature, country, imgSrc, isTemperature, unit }: GraphItemProps) => {
  return (
    <div className={classes.graphItem}>
      <img src={imgSrc} alt="fire" width="56px" height="56px" />
      <p className={classes.graphItemScore}>{score}</p>
      <p className={classes.graphItemTemperature}>{temperature} {unit}</p>
      <p className={classes.graphItemCountry}>{country}</p>
    </div>
  );
};

export default GraphItem;
