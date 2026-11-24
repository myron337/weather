"use client";

import React from "react";
import { asset } from "@/utils/asset";
import classes from "./TopBar.module.css";
import Image from "next/image";
import ButtonDegree from "../buttonDegree/ButtonDegree";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectTemperatureUnit } from "@/store/settings/settings.selectors";
import { setTemperatureUnit } from "@/store/settings/settings.slice";

const TopBar = () => {
  const dispatch = useAppDispatch();
  const unit = useAppSelector(selectTemperatureUnit);

  return (
    <div className={classes.topBar}>
      <div className={classes.logo}>
      <Image
        className={classes.icon}
        src={asset("/icons/main-logo.png")}
        alt="Weather Globe"
        width={30}
        height={30}
      />
      </div>
      <div>
        <h2>Weather Globe</h2>
        <p>Live conditions - all countries</p>
      </div>
      <div className={classes.degreeButton}>
        <ButtonDegree
          buttonText="°C"
          isActive={unit === "C"}
          onClick={() => dispatch(setTemperatureUnit("C"))}
        />
        <ButtonDegree
          buttonText="°F"
          isActive={unit === "F"}
          onClick={() => dispatch(setTemperatureUnit("F"))}
        />
      </div>
      <div className={classes.active}>
         {/* <Image
        className={classes.liveIcon}
        src={asset("/icons/radio.svg")}
        alt="Weather Globe"
        width={20}
        height={20}
      /> */}
      <div className={classes.liveIcon}>

      </div>
        Live
      </div>
    </div>
  );
};

export default TopBar;
