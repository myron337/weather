'use client';

import React from 'react';
import classes from './MainLocation.module.css';
import Location from '../location/Location';
import LocationCountry from '../locationCountry/LocationCountry';
import CurrentLocationWeather from '../container/currentLocationWeather/CurrentLocationWeather';
import { useSelectedCity } from '@/hooks/useSelectedCity';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useCityTime } from '@/hooks/useCityTime';
import {
    useReverseGeocodeQuery,
    useSearchCitiesQuery
} from '@/store/geocoding/geocoding.api';

// used only when geolocation is denied/unavailable or reverse lookup fails
const FALLBACK_CITY_QUERY = 'Oslo';

const MainLocation = () => {
    const { selectedCity } = useSelectedCity();
    const hasSelection = Boolean(selectedCity);

    const { coords, status } = useGeolocation(!hasSelection);
    const { data: geoCity, isError: isReverseError } = useReverseGeocodeQuery(
        coords ?? { latitude: 0, longitude: 0 },
        { skip: hasSelection || !coords }
    );

    const needsFallback = status === 'error' || isReverseError;
    const { data: fallbackCities } = useSearchCitiesQuery(
        { name: FALLBACK_CITY_QUERY, count: 1 },
        { skip: hasSelection || !needsFallback }
    );

    const city = selectedCity ?? geoCity ?? fallbackCities?.[0];
    const time = useCityTime(city?.timezone);

    return (
        <div className={classes.mainLocation}>
            <Location />
            <LocationCountry
                country={city?.country ?? ''}
                city={city?.name ?? ''}
                time={time}
            />
            <CurrentLocationWeather coordinates={city?.coordinates ?? null} />
        </div>
    );
}

export default MainLocation;
