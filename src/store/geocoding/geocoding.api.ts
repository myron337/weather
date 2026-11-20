'use client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  City,
  Coordinates,
  CountryCitiesResponse,
  GeocodingResponse,
  GeocodingSearchParams,
  ReverseGeocodingResponse
} from '@/store/geocoding/geocoding.type';

const DEFAULT_COUNT = 10;
const DEFAULT_LANGUAGE = 'en';
// Open-Meteo has no reverse geocoding; this endpoint is free and keyless
const REVERSE_GEOCODING_URL =
  'https://api.bigdatacloud.net/data/reverse-geocode-client';
const REVERSE_GEOCODED_CITY_ID = -1;
// Open-Meteo can't list cities by country; this endpoint is free and keyless
const COUNTRY_CITIES_URL =
  'https://countriesnow.space/api/v0.1/countries/cities/q';

export const geocodingApi = createApi({
  reducerPath: 'geocodingApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NEXT_PUBLIC_GEOCODING_HOST ??
      'https://geocoding-api.open-meteo.com/v1/'
  }),
  endpoints: (builder) => ({
    searchCities: builder.query<City[], GeocodingSearchParams>({
      query: ({
        name,
        count = DEFAULT_COUNT,
        language = DEFAULT_LANGUAGE,
        countryCode
      }) => ({
        url: 'search',
        params: { name, count, language, countryCode, format: 'json' }
      }),
      transformResponse: (response: GeocodingResponse) => {
        // dedupe by name + country: several regions can share both
        const unique = new Map<string, City>();
        response.results?.forEach(
          ({ id, name, country = '', country_code, timezone = 'UTC', latitude, longitude }) => {
            const key = `${name}|${country}`;
            if (!unique.has(key)) {
              unique.set(key, {
                id,
                name,
                country,
                countryCode: country_code,
                timezone,
                coordinates: { latitude, longitude }
              });
            }
          }
        );
        return [...unique.values()];
      }
    }),
    reverseGeocode: builder.query<City, Coordinates>({
      // absolute url bypasses baseUrl
      query: ({ latitude, longitude }) => ({
        url: REVERSE_GEOCODING_URL,
        params: { latitude, longitude, localityLanguage: DEFAULT_LANGUAGE }
      }),
      transformResponse: ({
        city,
        locality,
        principalSubdivision,
        countryName,
        countryCode,
        latitude,
        longitude
      }: ReverseGeocodingResponse) => ({
        id: REVERSE_GEOCODED_CITY_ID,
        name: city || locality || principalSubdivision,
        country: countryName,
        countryCode,
        // coords come from this device, so its own zone is the right one
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        coordinates: { latitude, longitude }
      })
    }),
    // names only: no ids/timezones, resolve via searchCities on select
    citiesByCountry: builder.query<string[], string>({
      query: (countryCode) => ({
        url: COUNTRY_CITIES_URL,
        params: { iso2: countryCode }
      }),
      transformResponse: ({ data }: CountryCitiesResponse) =>
        [...new Set(data ?? [])].sort((a, b) => a.localeCompare(b))
    })
  })
});

export const {
  useSearchCitiesQuery,
  useLazySearchCitiesQuery,
  useReverseGeocodeQuery,
  useCitiesByCountryQuery
} = geocodingApi;
