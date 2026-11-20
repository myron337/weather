// Country lookup built from the browser's Intl data, no API needed.

export interface Country {
  code: string; // ISO 3166-1 alpha-2
  name: string; // English name, matches what the APIs return
}

// region codes Intl knows that aren't countries
const NON_COUNTRY_CODES = new Set(['EU', 'EZ', 'UN', 'ZZ', 'QO', 'XA', 'XB']);
const SEARCH_LOCALES = ['en', 'ru'];
// shorter prefixes collide with city names too often (e.g. "Ber")
const MIN_PREFIX_LENGTH = 5;

interface CountryEntry extends Country {
  searchNames: string[];
}

const normalize = (value: string) => value.trim().toLocaleLowerCase();

// legacy codes (DD -> DE, SU -> RU, ...) would duplicate real countries
const isDeprecatedCode = (code: string) => {
  try {
    return Intl.getCanonicalLocales(`und-${code}`)[0] !== `und-${code}`;
  } catch {
    return true;
  }
};

let cache: CountryEntry[] | null = null;

const getCountries = (): CountryEntry[] => {
  if (cache) return cache;

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const displayNames = SEARCH_LOCALES.map(
    (locale) => new Intl.DisplayNames([locale], { type: 'region' })
  );
  const entries: CountryEntry[] = [];

  for (const first of letters) {
    for (const second of letters) {
      const code = first + second;
      if (NON_COUNTRY_CODES.has(code) || isDeprecatedCode(code)) continue;

      const names = displayNames
        .map((names) => {
          try {
            return names.of(code);
          } catch {
            return undefined;
          }
        })
        .filter((name): name is string => Boolean(name) && name !== code);

      if (names.length !== SEARCH_LOCALES.length) continue;

      entries.push({ code, name: names[0], searchNames: names.map(normalize) });
    }
  }

  cache = entries;
  return entries;
};

// exact name, or a long enough prefix that matches exactly one country
export const findCountry = (query: string): Country | null => {
  const needle = normalize(query);
  if (!needle) return null;

  const countries = getCountries();

  const exact = countries.find(({ searchNames }) => searchNames.includes(needle));
  if (exact) return { code: exact.code, name: exact.name };

  if (needle.length < MIN_PREFIX_LENGTH) return null;

  const byPrefix = countries.filter(({ searchNames }) =>
    searchNames.some((name) => name.startsWith(needle))
  );

  return byPrefix.length === 1
    ? { code: byPrefix[0].code, name: byPrefix[0].name }
    : null;
};
