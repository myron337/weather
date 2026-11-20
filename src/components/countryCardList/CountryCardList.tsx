"use client";

import React, { useState } from "react";
import classes from "./CountryCardList.module.css";
import CountryCard from "../countryCard/CountryCard";
import type { SearchItem } from "@/hooks/useCitySearch";
import type { City } from "@/store/geocoding/geocoding.type";

// each card makes its own weather (and maybe geocoding) request
const PAGE_SIZE = 9;

interface CountryCardListProps {
  items: SearchItem[];
  title?: string;
  isLoading?: boolean;
  isError?: boolean;
  emptyText?: string;
  onSelect: (city: City) => void;
}

// remount (via key) when the result set changes to reset the page count
const CountryCardList = ({
  items,
  title,
  isLoading,
  isError,
  emptyText = "No cities found",
  onSelect,
}: CountryCardListProps) => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  if (isError) {
    return <p className={classes.status}>Failed to load cities</p>;
  }

  if (isLoading && !items.length) {
    return <p className={classes.status}>Searching...</p>;
  }

  if (!items.length) {
    return <p className={classes.status}>{emptyText}</p>;
  }

  return (
    <section>
      {title && (
        <h3 className={classes.title}>
          {title} · {items.length}
        </h3>
      )}
      <div className={classes.grid}>
        {items.slice(0, visibleCount).map((item, index) => (
          <CountryCard
            key={item.key}
            item={item}
            onSelect={onSelect}
            // already-visible cards keep their place; only the new batch staggers
            index={index % PAGE_SIZE}
          />
        ))}
      </div>
      {visibleCount < items.length && (
        <button
          type="button"
          className={classes.showMore}
          onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
        >
          Show more
        </button>
      )}
    </section>
  );
};

export default CountryCardList;
