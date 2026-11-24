import React from "react";
import { asset } from "@/utils/asset";
import classes from "./GraphItem.module.css";

interface GraphItemProps {
  score: string;
  value: string;
  country: string;
  imgSrc: string;
  // shown on hover: which city the value was measured in
  title?: string;
}

const GraphItem = ({ score, value, country, imgSrc, title }: GraphItemProps) => {
  return (
    <div className={classes.graphItem} title={title}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset(imgSrc)} alt="" width="56" height="56" />
      <p className={classes.graphItemScore}>{score}</p>
      <p className={classes.graphItemTemperature}>{value}</p>
      <p className={classes.graphItemCountry}>{country}</p>
    </div>
  );
};

export default GraphItem;
