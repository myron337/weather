'use client';
import { useMemo } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import {
  useCitiesByCountryQuery,
  useSearchCitiesQuery
} from '@/store/geocoding/geocoding.api';
import { findCountry, type Country } from '@/utils/countries';
import { findCapital } from '@/utils/capitals';
import type { City } from '@/store/geocoding/geocoding.type';

// Open-Meteo returns nothing for 1 char and fuzzy-matches from 3+
export const MIN_CITY_QUERY_LENGTH = 2;

export type SearchItem =
  | { kind: 'city'; key: string; label: string; city: City }
  // from a country listing: no timezone yet, resolved on select
  | { kind: 'countryCity'; key: string; label: string; name: string; country: Country };

export const useCitySearch = (query: string) => {
  const trimmedQuery = query.trim();
  const debouncedQuery = useDebounce(trimmedQuery);
  const isQueryValid = debouncedQuery.length >= MIN_CITY_QUERY_LENGTH;

  const country = useMemo(
    () => (isQueryValid ? findCountry(debouncedQuery) : null),
    [debouncedQuery, isQueryValid]
  );

  const citySearch = useSearchCitiesQuery(
    { name: debouncedQuery },
    { skip: !isQueryValid || Boolean(country) }
  );
  const countrySearch = useCitiesByCountryQuery(country?.code ?? '', {
    skip: !country
  });

  const items = useMemo<SearchItem[]>(() => {
    if (!isQueryValid) return [];

    if (country) {
      const names = countrySearch.data ?? [];
      // listings are alphabetical; the capital is the most useful first card
      const capital = findCapital(country.code)?.capital;
      const capitalName =
        capital &&
        (names.find((name) => name.toLowerCase() === capital.toLowerCase()) ??
          capital);
      const ordered = capitalName
        ? [capitalName, ...names.filter((name) => name !== capitalName)]
        : names;

      return ordered.map((name) => ({
        kind: 'countryCity',
        key: `${country.code}|${name}`,
        label: name,
        name,
        country
      }));
    }

    return (citySearch.data ?? []).map((city) => ({
      kind: 'city',
      key: String(city.id),
      label: city.country ? `${city.name}, ${city.country}` : city.name,
      city
    }));
  }, [isQueryValid, country, countrySearch.data, citySearch.data]);

  const active = country ? countrySearch : citySearch;

  return {
    items,
    country,
    isLoading: active.isFetching || trimmedQuery !== debouncedQuery,
    isError: active.isError,
    isQueryValid: trimmedQuery.length >= MIN_CITY_QUERY_LENGTH
  };
};
