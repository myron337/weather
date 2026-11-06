"use client";

import React, { useState } from "react";
import classes from "./TopBar.module.css";
import Image from "next/image";
import ButtonDegree from "../buttonDegree/ButtonDegree";

const TopBar = () => {
  const [unit, setUnit] = useState<"C" | "F">("C");

  return (
    <div className={classes.topBar}>
      <div className={classes.logo}>
      <Image
        className={classes.icon}
        src="/icons/main-logo.png"
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
          onClick={() => setUnit("C")}
        />
        <ButtonDegree
          buttonText="°F"
          isActive={unit === "F"}
          onClick={() => setUnit("F")}
        />
      </div>
      <div className={classes.active}>
         {/* <Image
        className={classes.liveIcon}
        src="/icons/radio.svg"
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
