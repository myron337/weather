import React from 'react';
import classes from './MainLocation.module.css';
import Location from '../location/Location';
import LocationCountry from '../locationCountry/LocationCountry';
import CurrentLocationWeather from '../container/currentLocationWeather/CurrentLocationWeather';

const MainLocation = () => {
    return (
        <div className={classes.mainLocation}>
            <Location />
            <LocationCountry country="Norway" city="Oslo" time="13:30" />
            <CurrentLocationWeather />
        </div>
    );
}

export default MainLocation;
