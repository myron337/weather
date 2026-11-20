// WMO weather interpretation codes -> label + icon from /public/icons
// https://open-meteo.com/en/docs (section "WMO Weather interpretation codes")

interface WeatherCodeInfo {
  label: string;
  icon: string;
}

const ICONS = {
  clear: '/icons/clear-day.svg',
  partlyCloudy: '/icons/partly-cloudy-day.svg',
  cloudy: '/icons/cloudy.svg',
  fog: '/icons/fog.svg',
  showers: '/icons/partly-cloudy-day-rain.svg',
  rain: '/icons/rain.svg',
  snow: '/icons/snow.svg',
  thunder: '/icons/thunderstorms-day.svg'
};

const WEATHER_CODES: Record<number, WeatherCodeInfo> = {
  0: { label: 'Clear Sky', icon: ICONS.clear },
  1: { label: 'Mainly Clear', icon: ICONS.partlyCloudy },
  2: { label: 'Partly Cloudy', icon: ICONS.partlyCloudy },
  3: { label: 'Overcast', icon: ICONS.cloudy },
  45: { label: 'Fog', icon: ICONS.fog },
  48: { label: 'Rime Fog', icon: ICONS.fog },
  51: { label: 'Light Drizzle', icon: ICONS.showers },
  53: { label: 'Drizzle', icon: ICONS.showers },
  55: { label: 'Dense Drizzle', icon: ICONS.rain },
  56: { label: 'Freezing Drizzle', icon: ICONS.rain },
  57: { label: 'Freezing Drizzle', icon: ICONS.rain },
  61: { label: 'Light Rain', icon: ICONS.rain },
  63: { label: 'Rain', icon: ICONS.rain },
  65: { label: 'Heavy Rain', icon: ICONS.rain },
  66: { label: 'Freezing Rain', icon: ICONS.rain },
  67: { label: 'Freezing Rain', icon: ICONS.rain },
  71: { label: 'Light Snow', icon: ICONS.snow },
  73: { label: 'Snow', icon: ICONS.snow },
  75: { label: 'Heavy Snow', icon: ICONS.snow },
  77: { label: 'Snow Grains', icon: ICONS.snow },
  80: { label: 'Light Showers', icon: ICONS.showers },
  81: { label: 'Showers', icon: ICONS.showers },
  82: { label: 'Heavy Showers', icon: ICONS.rain },
  85: { label: 'Snow Showers', icon: ICONS.snow },
  86: { label: 'Heavy Snow Showers', icon: ICONS.snow },
  95: { label: 'Thunderstorm', icon: ICONS.thunder },
  96: { label: 'Thunderstorm, Hail', icon: ICONS.thunder },
  99: { label: 'Thunderstorm, Hail', icon: ICONS.thunder }
};

const UNKNOWN: WeatherCodeInfo = { label: 'Unknown', icon: ICONS.cloudy };

export const getWeatherCodeInfo = (code: number): WeatherCodeInfo =>
  WEATHER_CODES[code] ?? UNKNOWN;
