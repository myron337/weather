"use client";

import React, { useState } from "react";
import classes from "./SearchCountry.module.css";
import Continents from "../continents/Continents";

const SearchCountry = () => {
  const [activeContinent, setActiveContinent] = useState<string | null>(null);

  const handleClick = (continent: string) => {
    setActiveContinent((prev) => (prev === continent ? null : continent));
  };

  return (
    <div className={classes.searchCountry}>
      <div className={classes.inputWrapper}>
        <img
          className={classes.searchIcon}
          src="/icons/mglass.png"
          alt="magnifying glass"
        />
        <input
          className={classes.searchInput}
          type="text"
          placeholder="Search for a country..."
        />
      </div>
      <div className={classes.continents}>
        <Continents
          continent="Europe"
          isActive={activeContinent === "Europe"}
          onclick={() => handleClick("Europe")}
        />
        <Continents
          continent="Asia"
          isActive={activeContinent === "Asia"}
          onclick={() => handleClick("Asia")}
        />
        <Continents
          continent="Africa"
          isActive={activeContinent === "Africa"}
          onclick={() => handleClick("Africa")}
        />
        <Continents
          continent="North America"
          isActive={activeContinent === "North America"}
          onclick={() => handleClick("North America")}
        />
        <Continents
          continent="South America"
          isActive={activeContinent === "South America"}
          onclick={() => handleClick("South America")}
        />
        <Continents
          continent="Oceania"
          isActive={activeContinent === "Oceania"}
          onclick={() => handleClick("Oceania")}
        />
      </div>
    </div>
  );
};

export default SearchCountry;
