'use client';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectSelectedCity } from '@/store/location/location.selectors';
import {
  clearSelectedCity,
  setSelectedCity
} from '@/store/location/location.slice';
import type { City } from '@/store/geocoding/geocoding.type';

export const useSelectedCity = () => {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector(selectSelectedCity);

  const selectCity = useCallback(
    (city: City) => dispatch(setSelectedCity(city)),
    [dispatch]
  );

  // no selection -> MainLocation falls back to the user's geolocation
  const clearCity = useCallback(() => dispatch(clearSelectedCity()), [dispatch]);

  return { selectedCity, selectCity, clearCity };
};
