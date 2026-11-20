import React from 'react';
import classes from './CityList.module.css';
import type { SearchItem } from '@/hooks/useCitySearch';

// only the first rows get a staggered entrance, later pages appear instantly
const STAGGERED_ITEMS = 10;
const STAGGER_STEP_MS = 25;

interface CityListItemProps {
  item: SearchItem;
  index: number;
  onSelect?: (item: SearchItem) => void;
}

export const CityListItem = ({ item, index, onSelect }: CityListItemProps) => {
  // mousedown fires before input blur, so the list is still mounted
  const handleMouseDown = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    onSelect?.(item);
  };

  const style =
    index < STAGGERED_ITEMS
      ? { animationDelay: `${index * STAGGER_STEP_MS}ms` }
      : { animation: 'none' };

  return (
    <li className={classes.cityItem} style={style} onMouseDown={handleMouseDown}>
      {item.label}
    </li>
  );
};
