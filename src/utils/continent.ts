// Continent of a country, used for the continent filter and the card label.

export const CONTINENTS = [
  'Europe',
  'Asia',
  'Africa',
  'North America',
  'South America',
  'Oceania'
] as const;

export type Continent = (typeof CONTINENTS)[number];

// ISO 3166-1 alpha-2 codes per continent. Transcontinental countries go
// where their capital is (Russia -> Europe, Turkey/Kazakhstan -> Asia);
// Cyprus is listed with Europe as an EU member.
const COUNTRIES_BY_CONTINENT: Record<Continent, string> = {
  Europe:
    'AD AL AT AX BA BE BG BY CH CY CZ DE DK EE ES FI FO FR GB GG GI GR HR HU ' +
    'IE IM IS IT JE LI LT LU LV MC MD ME MK MT NL NO PL PT RO RS RU SE SI SJ ' +
    'SK SM UA VA XK',
  Asia:
    'AE AF AM AZ BD BH BN BT CN GE HK ID IL IN IO IQ IR JO JP KG KH KP KR KW ' +
    'KZ LA LB LK MM MN MO MV MY NP OM PH PK PS QA SA SG SY TH TJ TL TM TR TW ' +
    'UZ VN YE',
  Africa:
    'AO BF BI BJ BW CD CF CG CI CM CV DJ DZ EG EH ER ET GA GH GM GN GQ GW KE ' +
    'KM LR LS LY MA MG ML MR MU MW MZ NA NE NG RE RW SC SD SH SL SN SO SS ST ' +
    'SZ TD TG TN TZ UG YT ZA ZM ZW',
  'North America':
    'AG AI AW BB BL BM BQ BS BZ CA CR CU CW DM DO GD GL GP GT HN HT JM KN KY ' +
    'LC MF MQ MS MX NI PA PM PR SV SX TC TT US VC VG VI',
  'South America': 'AR BO BR CL CO EC FK GF GY PE PY SR UY VE',
  Oceania:
    'AS AU CK FJ FM GU KI MH MP NC NF NR NU NZ PF PG PN PW SB TK TO TV UM VU ' +
    'WF WS'
};

const CONTINENT_BY_COUNTRY = new Map<string, Continent>(
  CONTINENTS.flatMap((continent) =>
    COUNTRIES_BY_CONTINENT[continent]
      .split(' ')
      .map((code) => [code, continent] as const)
  )
);

export const getCountryContinent = (countryCode?: string) =>
  countryCode ? (CONTINENT_BY_COUNTRY.get(countryCode) ?? null) : null;

// fallback for countries missing above: the IANA zone prefix
const BY_ZONE_PREFIX: Record<string, string> = {
  Europe: 'Europe',
  Asia: 'Asia',
  Africa: 'Africa',
  America: 'America',
  Australia: 'Oceania',
  Pacific: 'Oceania',
  Antarctica: 'Antarctica',
  Atlantic: 'Atlantic',
  Indian: 'Indian Ocean'
};

export const getContinent = (timezone: string, countryCode?: string) =>
  getCountryContinent(countryCode) ?? BY_ZONE_PREFIX[timezone.split('/')[0]] ?? '';
