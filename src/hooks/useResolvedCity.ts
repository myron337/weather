'use client';
import { useSearchCitiesQuery } from '@/store/geocoding/geocoding.api';
import type { City } from '@/store/geocoding/geocoding.type';
import type { SearchItem } from '@/hooks/useCitySearch';

// country listings carry names only: look the city up for coords + timezone
export const useResolvedCity = (item: SearchItem) => {
  const needsLookup = item.kind === 'countryCity';
  const { data, isFetching, isError } = useSearchCitiesQuery(
    needsLookup
      ? { name: item.name, countryCode: item.country.code, count: 1 }
      : { name: '' },
    { skip: !needsLookup }
  );

  const city: City | null =
    item.kind === 'city' ? item.city : (data?.[0] ?? null);

  return {
    city,
    isLoading: needsLookup && isFetching,
    // lookup finished but Open-Meteo doesn't know this place
    isUnresolved:
      needsLookup && !isFetching && (isError || Boolean(data && !data[0]))
  };
};
