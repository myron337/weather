// https://open-meteo.com/en/docs

export interface CurrentWeatherResponse {
  timezone: string;
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: 0 | 1;
    weather_code: number;
    wind_speed_10m: number;
    uv_index: number | null;
    visibility: number | null;
  };
}

export interface CurrentWeather {
  temperature: number; // °C
  feelsLike: number; // °C
  humidity: number; // %
  windSpeed: number; // km/h
  weatherCode: number; // WMO code
  isDay: boolean;
  uvIndex: number | null;
  visibility: number | null; // m
  timezone: string; // IANA zone of the coordinates
}

// multi-location request: one entry per coordinate pair, same order
export type WorldWeatherResponse = Array<{
  current: {
    temperature_2m: number | null;
    relative_humidity_2m: number | null;
    wind_speed_10m: number | null;
  };
}>;

export interface WorldExtreme {
  country: string;
  capital: string;
  value: number;
}

export interface WorldExtremes {
  hottest: WorldExtreme;
  coldest: WorldExtreme;
  windiest: WorldExtreme;
  mostHumid: WorldExtreme;
}
