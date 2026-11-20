import React, { useState } from 'react';
import classes from './CityList.module.css';
import { CityListItem } from './CityListItem';
import type { SearchItem } from '@/hooks/useCitySearch';

// country listings can hold ~20k cities, so render them in chunks
const PAGE_SIZE = 100;
const LOAD_MORE_THRESHOLD_PX = 120;

interface CityListProps {
  items: SearchItem[];
  title?: string;
  isLoading?: boolean;
  isError?: boolean;
  onSelect?: (item: SearchItem) => void;
}

// remount (via key) when the result set changes to reset the page count
export const CityList = ({
  items,
  title,
  isLoading,
  isError,
  onSelect
}: CityListProps) => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  if (isError) {
    return <p className={classes.status}>Failed to load cities</p>;
  }

  if (isLoading && !items.length) {
    return <p className={classes.status}>Searching...</p>;
  }

  if (!items.length) {
    return <p className={classes.status}>No cities found</p>;
  }

  const handleScroll = (event: React.UIEvent<HTMLUListElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    if (scrollHeight - scrollTop - clientHeight < LOAD_MORE_THRESHOLD_PX) {
      setVisibleCount((count) => Math.min(count + PAGE_SIZE, items.length));
    }
  };

  return (
    <ul className={classes.cityList} onScroll={handleScroll}>
      {title && (
        <li className={classes.title}>
          {title} · {items.length}
        </li>
      )}
      {items.slice(0, visibleCount).map((item, index) => (
        <CityListItem
          key={item.key}
          item={item}
          index={index}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
};
