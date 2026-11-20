// Capitals of the 193 UN member states, used as one measuring point per
// country for the world extremes and to put the capital first in search.
// [ISO 3166-1 alpha-2, country, capital, latitude, longitude]
type CapitalRow = [string, string, string, number, number];

const ROWS: CapitalRow[] = [
  ['AF', 'Afghanistan', 'Kabul', 34.53, 69.17],
  ['AL', 'Albania', 'Tirana', 41.33, 19.82],
  ['DZ', 'Algeria', 'Algiers', 36.75, 3.06],
  ['AD', 'Andorra', 'Andorra la Vella', 42.51, 1.52],
  ['AO', 'Angola', 'Luanda', -8.84, 13.23],
  ['AG', 'Antigua and Barbuda', "St. John's", 17.12, -61.85],
  ['AR', 'Argentina', 'Buenos Aires', -34.6, -58.38],
  ['AM', 'Armenia', 'Yerevan', 40.18, 44.51],
  ['AU', 'Australia', 'Canberra', -35.28, 149.13],
  ['AT', 'Austria', 'Vienna', 48.21, 16.37],
  ['AZ', 'Azerbaijan', 'Baku', 40.41, 49.87],
  ['BS', 'Bahamas', 'Nassau', 25.05, -77.35],
  ['BH', 'Bahrain', 'Manama', 26.23, 50.59],
  ['BD', 'Bangladesh', 'Dhaka', 23.81, 90.41],
  ['BB', 'Barbados', 'Bridgetown', 13.1, -59.62],
  ['BY', 'Belarus', 'Minsk', 53.9, 27.57],
  ['BE', 'Belgium', 'Brussels', 50.85, 4.35],
  ['BZ', 'Belize', 'Belmopan', 17.25, -88.77],
  ['BJ', 'Benin', 'Porto-Novo', 6.5, 2.6],
  ['BT', 'Bhutan', 'Thimphu', 27.47, 89.64],
  ['BO', 'Bolivia', 'La Paz', -16.5, -68.15],
  ['BA', 'Bosnia and Herzegovina', 'Sarajevo', 43.86, 18.41],
  ['BW', 'Botswana', 'Gaborone', -24.65, 25.91],
  ['BR', 'Brazil', 'Brasília', -15.79, -47.88],
  ['BN', 'Brunei', 'Bandar Seri Begawan', 4.9, 114.94],
  ['BG', 'Bulgaria', 'Sofia', 42.7, 23.32],
  ['BF', 'Burkina Faso', 'Ouagadougou', 12.37, -1.52],
  ['BI', 'Burundi', 'Gitega', -3.43, 29.93],
  ['CV', 'Cape Verde', 'Praia', 14.93, -23.51],
  ['KH', 'Cambodia', 'Phnom Penh', 11.56, 104.92],
  ['CM', 'Cameroon', 'Yaoundé', 3.85, 11.5],
  ['CA', 'Canada', 'Ottawa', 45.42, -75.7],
  ['CF', 'Central African Republic', 'Bangui', 4.39, 18.56],
  ['TD', 'Chad', "N'Djamena", 12.13, 15.06],
  ['CL', 'Chile', 'Santiago', -33.45, -70.67],
  ['CN', 'China', 'Beijing', 39.9, 116.41],
  ['CO', 'Colombia', 'Bogotá', 4.71, -74.07],
  ['KM', 'Comoros', 'Moroni', -11.7, 43.26],
  ['CG', 'Congo - Brazzaville', 'Brazzaville', -4.27, 15.28],
  ['CD', 'Congo - Kinshasa', 'Kinshasa', -4.32, 15.31],
  ['CR', 'Costa Rica', 'San José', 9.93, -84.08],
  ['CI', "Côte d'Ivoire", 'Yamoussoukro', 6.83, -5.29],
  ['HR', 'Croatia', 'Zagreb', 45.81, 15.98],
  ['CU', 'Cuba', 'Havana', 23.11, -82.37],
  ['CY', 'Cyprus', 'Nicosia', 35.19, 33.38],
  ['CZ', 'Czechia', 'Prague', 50.08, 14.44],
  ['DK', 'Denmark', 'Copenhagen', 55.68, 12.57],
  ['DJ', 'Djibouti', 'Djibouti', 11.59, 43.15],
  ['DM', 'Dominica', 'Roseau', 15.3, -61.39],
  ['DO', 'Dominican Republic', 'Santo Domingo', 18.49, -69.93],
  ['EC', 'Ecuador', 'Quito', -0.18, -78.47],
  ['EG', 'Egypt', 'Cairo', 30.04, 31.24],
  ['SV', 'El Salvador', 'San Salvador', 13.69, -89.22],
  ['GQ', 'Equatorial Guinea', 'Malabo', 3.75, 8.78],
  ['ER', 'Eritrea', 'Asmara', 15.32, 38.93],
  ['EE', 'Estonia', 'Tallinn', 59.44, 24.75],
  ['SZ', 'Eswatini', 'Mbabane', -26.31, 31.14],
  ['ET', 'Ethiopia', 'Addis Ababa', 9.03, 38.74],
  ['FJ', 'Fiji', 'Suva', -18.14, 178.44],
  ['FI', 'Finland', 'Helsinki', 60.17, 24.94],
  ['FR', 'France', 'Paris', 48.86, 2.35],
  ['GA', 'Gabon', 'Libreville', 0.42, 9.47],
  ['GM', 'Gambia', 'Banjul', 13.45, -16.58],
  ['GE', 'Georgia', 'Tbilisi', 41.72, 44.79],
  ['DE', 'Germany', 'Berlin', 52.52, 13.4],
  ['GH', 'Ghana', 'Accra', 5.6, -0.19],
  ['GR', 'Greece', 'Athens', 37.98, 23.73],
  ['GD', 'Grenada', "St. George's", 12.06, -61.75],
  ['GT', 'Guatemala', 'Guatemala City', 14.63, -90.51],
  ['GN', 'Guinea', 'Conakry', 9.64, -13.58],
  ['GW', 'Guinea-Bissau', 'Bissau', 11.86, -15.6],
  ['GY', 'Guyana', 'Georgetown', 6.8, -58.16],
  ['HT', 'Haiti', 'Port-au-Prince', 18.59, -72.31],
  ['HN', 'Honduras', 'Tegucigalpa', 14.07, -87.19],
  ['HU', 'Hungary', 'Budapest', 47.5, 19.04],
  ['IS', 'Iceland', 'Reykjavík', 64.15, -21.94],
  ['IN', 'India', 'New Delhi', 28.61, 77.21],
  ['ID', 'Indonesia', 'Jakarta', -6.21, 106.85],
  ['IR', 'Iran', 'Tehran', 35.69, 51.39],
  ['IQ', 'Iraq', 'Baghdad', 33.31, 44.36],
  ['IE', 'Ireland', 'Dublin', 53.35, -6.26],
  ['IL', 'Israel', 'Jerusalem', 31.77, 35.21],
  ['IT', 'Italy', 'Rome', 41.9, 12.5],
  ['JM', 'Jamaica', 'Kingston', 18.02, -76.8],
  ['JP', 'Japan', 'Tokyo', 35.68, 139.69],
  ['JO', 'Jordan', 'Amman', 31.95, 35.93],
  ['KZ', 'Kazakhstan', 'Astana', 51.17, 71.43],
  ['KE', 'Kenya', 'Nairobi', -1.29, 36.82],
  ['KI', 'Kiribati', 'South Tarawa', 1.33, 172.98],
  ['KW', 'Kuwait', 'Kuwait City', 29.38, 47.99],
  ['KG', 'Kyrgyzstan', 'Bishkek', 42.87, 74.59],
  ['LA', 'Laos', 'Vientiane', 17.98, 102.63],
  ['LV', 'Latvia', 'Riga', 56.95, 24.11],
  ['LB', 'Lebanon', 'Beirut', 33.89, 35.5],
  ['LS', 'Lesotho', 'Maseru', -29.31, 27.48],
  ['LR', 'Liberia', 'Monrovia', 6.3, -10.8],
  ['LY', 'Libya', 'Tripoli', 32.89, 13.19],
  ['LI', 'Liechtenstein', 'Vaduz', 47.14, 9.52],
  ['LT', 'Lithuania', 'Vilnius', 54.69, 25.28],
  ['LU', 'Luxembourg', 'Luxembourg', 49.61, 6.13],
  ['MG', 'Madagascar', 'Antananarivo', -18.88, 47.51],
  ['MW', 'Malawi', 'Lilongwe', -13.96, 33.79],
  ['MY', 'Malaysia', 'Kuala Lumpur', 3.14, 101.69],
  ['MV', 'Maldives', 'Malé', 4.18, 73.51],
  ['ML', 'Mali', 'Bamako', 12.64, -8.0],
  ['MT', 'Malta', 'Valletta', 35.9, 14.51],
  ['MH', 'Marshall Islands', 'Majuro', 7.09, 171.38],
  ['MR', 'Mauritania', 'Nouakchott', 18.08, -15.98],
  ['MU', 'Mauritius', 'Port Louis', -20.16, 57.5],
  ['MX', 'Mexico', 'Mexico City', 19.43, -99.13],
  ['FM', 'Micronesia', 'Palikir', 6.92, 158.16],
  ['MD', 'Moldova', 'Chișinău', 47.01, 28.86],
  ['MC', 'Monaco', 'Monaco', 43.73, 7.42],
  ['MN', 'Mongolia', 'Ulaanbaatar', 47.89, 106.91],
  ['ME', 'Montenegro', 'Podgorica', 42.44, 19.26],
  ['MA', 'Morocco', 'Rabat', 34.02, -6.84],
  ['MZ', 'Mozambique', 'Maputo', -25.97, 32.57],
  ['MM', 'Myanmar', 'Naypyidaw', 19.76, 96.08],
  ['NA', 'Namibia', 'Windhoek', -22.56, 17.08],
  ['NR', 'Nauru', 'Yaren', -0.55, 166.92],
  ['NP', 'Nepal', 'Kathmandu', 27.72, 85.32],
  ['NL', 'Netherlands', 'Amsterdam', 52.37, 4.9],
  ['NZ', 'New Zealand', 'Wellington', -41.29, 174.78],
  ['NI', 'Nicaragua', 'Managua', 12.11, -86.24],
  ['NE', 'Niger', 'Niamey', 13.51, 2.11],
  ['NG', 'Nigeria', 'Abuja', 9.08, 7.4],
  ['KP', 'North Korea', 'Pyongyang', 39.04, 125.76],
  ['MK', 'North Macedonia', 'Skopje', 42.0, 21.43],
  ['NO', 'Norway', 'Oslo', 59.91, 10.75],
  ['OM', 'Oman', 'Muscat', 23.59, 58.41],
  ['PK', 'Pakistan', 'Islamabad', 33.68, 73.05],
  ['PW', 'Palau', 'Ngerulmud', 7.5, 134.62],
  ['PA', 'Panama', 'Panama City', 8.98, -79.52],
  ['PG', 'Papua New Guinea', 'Port Moresby', -9.44, 147.18],
  ['PY', 'Paraguay', 'Asunción', -25.26, -57.58],
  ['PE', 'Peru', 'Lima', -12.05, -77.04],
  ['PH', 'Philippines', 'Manila', 14.6, 120.98],
  ['PL', 'Poland', 'Warsaw', 52.23, 21.01],
  ['PT', 'Portugal', 'Lisbon', 38.72, -9.14],
  ['QA', 'Qatar', 'Doha', 25.29, 51.53],
  ['RO', 'Romania', 'Bucharest', 44.43, 26.1],
  ['RU', 'Russia', 'Moscow', 55.76, 37.62],
  ['RW', 'Rwanda', 'Kigali', -1.94, 30.06],
  ['KN', 'St. Kitts and Nevis', 'Basseterre', 17.3, -62.72],
  ['LC', 'St. Lucia', 'Castries', 14.01, -60.99],
  ['VC', 'St. Vincent and the Grenadines', 'Kingstown', 13.16, -61.22],
  ['WS', 'Samoa', 'Apia', -13.83, -171.76],
  ['SM', 'San Marino', 'San Marino', 43.94, 12.45],
  ['ST', 'São Tomé and Príncipe', 'São Tomé', 0.34, 6.73],
  ['SA', 'Saudi Arabia', 'Riyadh', 24.71, 46.68],
  ['SN', 'Senegal', 'Dakar', 14.72, -17.47],
  ['RS', 'Serbia', 'Belgrade', 44.79, 20.45],
  ['SC', 'Seychelles', 'Victoria', -4.62, 55.45],
  ['SL', 'Sierra Leone', 'Freetown', 8.48, -13.23],
  ['SG', 'Singapore', 'Singapore', 1.35, 103.82],
  ['SK', 'Slovakia', 'Bratislava', 48.15, 17.11],
  ['SI', 'Slovenia', 'Ljubljana', 46.06, 14.51],
  ['SB', 'Solomon Islands', 'Honiara', -9.43, 159.96],
  ['SO', 'Somalia', 'Mogadishu', 2.05, 45.32],
  ['ZA', 'South Africa', 'Pretoria', -25.75, 28.19],
  ['KR', 'South Korea', 'Seoul', 37.57, 126.98],
  ['SS', 'South Sudan', 'Juba', 4.85, 31.58],
  ['ES', 'Spain', 'Madrid', 40.42, -3.7],
  ['LK', 'Sri Lanka', 'Sri Jayawardenepura Kotte', 6.89, 79.92],
  ['SD', 'Sudan', 'Khartoum', 15.5, 32.56],
  ['SR', 'Suriname', 'Paramaribo', 5.85, -55.2],
  ['SE', 'Sweden', 'Stockholm', 59.33, 18.07],
  ['CH', 'Switzerland', 'Bern', 46.95, 7.45],
  ['SY', 'Syria', 'Damascus', 33.51, 36.29],
  ['TJ', 'Tajikistan', 'Dushanbe', 38.56, 68.77],
  ['TZ', 'Tanzania', 'Dodoma', -6.16, 35.75],
  ['TH', 'Thailand', 'Bangkok', 13.76, 100.5],
  ['TL', 'Timor-Leste', 'Dili', -8.56, 125.57],
  ['TG', 'Togo', 'Lomé', 6.13, 1.22],
  ['TO', 'Tonga', "Nuku'alofa", -21.14, -175.2],
  ['TT', 'Trinidad and Tobago', 'Port of Spain', 10.66, -61.51],
  ['TN', 'Tunisia', 'Tunis', 36.81, 10.18],
  ['TR', 'Turkey', 'Ankara', 39.93, 32.86],
  ['TM', 'Turkmenistan', 'Ashgabat', 37.96, 58.33],
  ['TV', 'Tuvalu', 'Funafuti', -8.52, 179.2],
  ['UG', 'Uganda', 'Kampala', 0.35, 32.58],
  ['UA', 'Ukraine', 'Kyiv', 50.45, 30.52],
  ['AE', 'United Arab Emirates', 'Abu Dhabi', 24.45, 54.38],
  ['GB', 'United Kingdom', 'London', 51.51, -0.13],
  ['US', 'United States', 'Washington, D.C.', 38.91, -77.04],
  ['UY', 'Uruguay', 'Montevideo', -34.9, -56.16],
  ['UZ', 'Uzbekistan', 'Tashkent', 41.3, 69.24],
  ['VU', 'Vanuatu', 'Port Vila', -17.73, 168.32],
  ['VE', 'Venezuela', 'Caracas', 10.48, -66.9],
  ['VN', 'Vietnam', 'Hanoi', 21.03, 105.85],
  ['YE', 'Yemen', "Sana'a", 15.37, 44.19],
  ['ZM', 'Zambia', 'Lusaka', -15.39, 28.32],
  ['ZW', 'Zimbabwe', 'Harare', -17.83, 31.05],
];

export interface Capital {
  code: string;
  country: string;
  capital: string;
  latitude: number;
  longitude: number;
}

export const CAPITALS: Capital[] = ROWS.map(
  ([code, country, capital, latitude, longitude]) => ({
    code,
    country,
    capital,
    latitude,
    longitude,
  })
);

export const findCapital = (countryCode: string) =>
  CAPITALS.find(({ code }) => code === countryCode) ?? null;

// rough region from coordinates, only used to vary the default order
const getRegion = ({ latitude, longitude }: Capital) => {
  if (longitude < -30) return "americas";
  if (longitude > 110 && latitude < 0) return "oceania";
  if (longitude > 150 || longitude < -150) return "oceania";
  // Valletta sits south of Tunis and Algiers, hence the second clause
  const isEurope = latitude >= 37.5 || (latitude >= 35.5 && longitude > 14);
  if (isEurope && longitude < 45) return "europe";
  // east of Suez / Cyprus counts as Asia
  const isMiddleEast =
    (longitude > 34 && latitude > 12) || (longitude > 32 && latitude > 33);
  if (longitude < 52 && latitude < 37.5 && !isMiddleEast) return "africa";
  return "asia";
};

// fixed-seed shuffle: same order on every load (no flicker between renders)
const shuffled = <T,>(items: T[], seed: number) => {
  const result = [...items];
  let state = seed;
  const random = () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const REGION_ORDER = ["europe", "asia", "africa", "americas", "oceania"];

// take one capital from each region in turn so every page is varied
const interleaveByRegion = (capitals: Capital[]) => {
  const groups = new Map<string, Capital[]>();
  for (const capital of capitals) {
    const region = getRegion(capital);
    groups.set(region, [...(groups.get(region) ?? []), capital]);
  }
  const queues = REGION_ORDER.map((region) => groups.get(region) ?? []);
  const result: Capital[] = [];
  while (result.length < capitals.length) {
    for (const queue of queues) {
      const next = queue.shift();
      if (next) result.push(next);
    }
  }
  return result;
};

const SHUFFLE_SEED = 20261120;

export const SHUFFLED_CAPITALS = interleaveByRegion(
  shuffled(CAPITALS, SHUFFLE_SEED)
);
