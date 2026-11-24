"use client";

import React from "react";
import { asset } from "@/utils/asset";
import classes from "./SearchCountry.module.css";
import Continents from "../continents/Continents";
import { CONTINENTS, type Continent } from "@/utils/continent";

export type ContinentFilter = Continent | "All";

const CONTINENT_FILTERS: ContinentFilter[] = ["All", ...CONTINENTS];

interface SearchCountryProps {
  query: string;
  onQueryChange: (query: string) => void;
  activeContinent: ContinentFilter;
  onContinentChange: (continent: ContinentFilter) => void;
}

const SearchCountry = ({
  query,
  onQueryChange,
  activeContinent,
  onContinentChange,
}: SearchCountryProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };

  return (
    <div className={classes.searchCountry}>
      <div className={classes.inputWrapper}>
        <img
          className={classes.searchIcon}
          src={asset("/icons/mglass.png")}
          alt="magnifying glass"
        />
        <input
          className={classes.searchInput}
          type="text"
          placeholder="Search for a city or country..."
          value={query}
          onChange={handleChange}
        />
      </div>
      <div className={classes.continents}>
        {CONTINENT_FILTERS.map((continent) => (
          <Continents
            key={continent}
            continent={continent}
            isActive={activeContinent === continent}
            onclick={() => onContinentChange(continent)}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchCountry;
