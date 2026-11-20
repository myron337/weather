"use client";

import React, { useState } from "react";
import SearchCountry, {
  type ContinentFilter,
} from "../searchCountry/SearchCountry";
import CountryCardList from "../countryCardList/CountryCardList";
import { useCitySearch, type SearchItem } from "@/hooks/useCitySearch";
import { useSelectedCity } from "@/hooks/useSelectedCity";
import type { City } from "@/store/geocoding/geocoding.type";
import { SHUFFLED_CAPITALS } from "@/utils/capitals";
import { getCountryContinent } from "@/utils/continent";

// ids below this never clash with Open-Meteo ids or the other sentinels
const CAPITAL_ID_BASE = -1000;

// shown before anything is typed; coords are known, the timezone comes
// from the weather response, so no geocoding lookup per card
const CAPITAL_ITEMS: SearchItem[] = SHUFFLED_CAPITALS.map((capital, index) => ({
  kind: "city",
  key: `capital|${capital.code}`,
  label: capital.capital,
  city: {
    id: CAPITAL_ID_BASE - index,
    name: capital.capital,
    country: capital.country,
    countryCode: capital.code,
    timezone: "",
    coordinates: { latitude: capital.latitude, longitude: capital.longitude },
  },
}));

const getItemCountryCode = (item: SearchItem) =>
  item.kind === "city" ? item.city.countryCode : item.country.code;

const filterByContinent = (items: SearchItem[], continent: ContinentFilter) =>
  continent === "All"
    ? items
    : items.filter(
        (item) => getCountryContinent(getItemCountryCode(item)) === continent
      );

const SearchSection = () => {
  const [query, setQuery] = useState("");
  const [continent, setContinent] = useState<ContinentFilter>("All");
  const { items, country, isLoading, isError, isQueryValid } =
    useCitySearch(query);
  const { selectCity } = useSelectedCity();

  // clicking the active continent again goes back to "All"
  const handleContinentChange = (next: ContinentFilter) => {
    setContinent((prev) => (prev === next ? "All" : next));
  };

  // the selected city replaces the main location block at the top
  const handleSelect = (city: City) => {
    selectCity(city);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isFiltered = continent !== "All";
  const emptyText = isFiltered ? `Nothing found in ${continent}` : undefined;

  return (
    <>
      <SearchCountry
        query={query}
        onQueryChange={setQuery}
        activeContinent={continent}
        onContinentChange={handleContinentChange}
      />
      {isQueryValid ? (
        <CountryCardList
          key={`${country?.code ?? query.trim().toLowerCase()}|${continent}`}
          items={filterByContinent(items, continent)}
          title={
            country
              ? `Cities in ${country.name}`
              : isFiltered
                ? `Search results in ${continent}`
                : "Search results"
          }
          emptyText={emptyText}
          isLoading={isLoading}
          isError={isError}
          onSelect={handleSelect}
        />
      ) : (
        <CountryCardList
          key={`capitals|${continent}`}
          items={filterByContinent(CAPITAL_ITEMS, continent)}
          title={isFiltered ? `Capitals of ${continent}` : "World capitals"}
          emptyText={emptyText}
          onSelect={handleSelect}
        />
      )}
    </>
  );
};

export default SearchSection;
