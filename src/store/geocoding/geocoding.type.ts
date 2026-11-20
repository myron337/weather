// https://open-meteo.com/en/docs/geocoding-api

export interface GeocodingSearchParams {
  name: string;
  count?: number;
  language?: string;
  // ISO 3166-1 alpha-2, narrows results to one country
  countryCode?: string;
}

export interface GeocodingResult {
  id: number;
  name: string;
  country?: string;
  country_code?: string;
  timezone?: string;
  latitude: number;
  longitude: number;
}

export interface GeocodingResponse {
  results?: GeocodingResult[];
  generationtime_ms: number;
}

export interface City {
  id: number;
  name: string;
  country: string;
  // ISO 3166-1 alpha-2; optional because persisted cities predate it
  countryCode?: string;
  // IANA name, e.g. "Europe/Oslo"
  timezone: string;
  // null when the city could not be geolocated (no weather then)
  coordinates: Coordinates | null;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

// https://www.bigdatacloud.com/free-api/free-reverse-geocode-to-city-api
export interface ReverseGeocodingResponse {
  city: string;
  locality: string;
  principalSubdivision: string;
  countryName: string;
  countryCode: string;
  latitude: number;
  longitude: number;
}

// https://countriesnow.space
export interface CountryCitiesResponse {
  error: boolean;
  msg: string;
  data?: string[];
}
