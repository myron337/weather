'use client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Coordinates } from '@/store/geocoding/geocoding.type';
import type {
  CurrentWeather,
  CurrentWeatherResponse,
  WorldExtreme,
  WorldExtremes,
  WorldWeatherResponse
} from '@/store/weather/weather.type';
import { CAPITALS } from '@/utils/capitals';

const CURRENT_FIELDS = [
  'temperature_2m',
  'relative_humidity_2m',
  'apparent_temperature',
  'is_day',
  'weather_code',
  'wind_speed_10m',
  'uv_index',
  'visibility'
].join(',');

// Open-Meteo refreshes "current" every 15 minutes
export const WEATHER_POLLING_INTERVAL = 15 * 60 * 1000;
// each capital counts as one call against Open-Meteo's free daily quota,
// so the world stats refresh less often than the main location
export const WORLD_EXTREMES_POLLING_INTERVAL = 60 * 60 * 1000;

const WORLD_FIELDS = [
  'temperature_2m',
  'relative_humidity_2m',
  'wind_speed_10m'
].join(',');

type WorldField = keyof WorldWeatherResponse[number]['current'];

const pickExtreme = (
  response: WorldWeatherResponse,
  field: WorldField,
  isBetter: (candidate: number, best: number) => boolean
): WorldExtreme => {
  let best: WorldExtreme | null = null;

  for (const [index, { current }] of response.entries()) {
    const value = current?.[field];
    if (value == null) continue;
    if (!best || isBetter(value, best.value)) {
      const { country, capital } = CAPITALS[index];
      best = { country, capital, value };
    }
  }

  if (!best) throw new Error(`No ${field} data for any capital`);
  return best;
};

const higher = (a: number, b: number) => a > b;
const lower = (a: number, b: number) => a < b;

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NEXT_PUBLIC_WEATHER_HOST ?? 'https://api.open-meteo.com/v1/'
  }),
  endpoints: (builder) => ({
    getCurrentWeather: builder.query<CurrentWeather, Coordinates>({
      query: ({ latitude, longitude }) => ({
        url: 'forecast',
        // timezone=auto also tells us the zone of places we only have coords for
        params: { latitude, longitude, current: CURRENT_FIELDS, timezone: 'auto' }
      }),
      transformResponse: ({ current, timezone }: CurrentWeatherResponse) => ({
        temperature: current.temperature_2m,
        feelsLike: current.apparent_temperature,
        humidity: current.relative_humidity_2m,
        windSpeed: current.wind_speed_10m,
        weatherCode: current.weather_code,
        isDay: current.is_day === 1,
        uvIndex: current.uv_index,
        visibility: current.visibility,
        timezone
      })
    }),
    getWorldExtremes: builder.query<WorldExtremes, void>({
      query: () => ({
        url: 'forecast',
        params: {
          latitude: CAPITALS.map((c) => c.latitude).join(','),
          longitude: CAPITALS.map((c) => c.longitude).join(','),
          current: WORLD_FIELDS
        }
      }),
      transformResponse: (response: WorldWeatherResponse) => ({
        hottest: pickExtreme(response, 'temperature_2m', higher),
        coldest: pickExtreme(response, 'temperature_2m', lower),
        windiest: pickExtreme(response, 'wind_speed_10m', higher),
        mostHumid: pickExtreme(response, 'relative_humidity_2m', higher)
      })
    })
  })
});

export const { useGetCurrentWeatherQuery, useGetWorldExtremesQuery } =
  weatherApi;
