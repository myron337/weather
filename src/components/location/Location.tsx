'use client';

import React from "react";
import classes from "./Location.module.css";
import { useSelectedCity } from "@/hooks/useSelectedCity";

const Location = () => {
  const { clearCity } = useSelectedCity();

  return (
    <button type="button" className={classes.location} onClick={clearCity}>
      <span className={classes.liveIcon}></span>
      Your current location
    </button>
  );
};

export default Location;
