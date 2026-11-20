import React from 'react';
import classes from './LocationCountry.module.css';

interface LocationCountryProps {
    country: string;
    city: string;
    time: string;
}

const LocationCountry = ({ country, city, time }: LocationCountryProps) => {
    return (
        <div className={classes.locationCountry}>
            <h2 key={city} className={classes.fadeIn}>{city}</h2>
           <div className={classes.locationDetails}>
            {/* prefixed: both are '' while loading and would collide */}
            <p key={`country-${country}`} className={classes.fadeIn}>{country}</p>
            <p key={`time-${time}`} className={classes.fadeIn}>{time}</p>
            </div>
        </div>
    );
}

export default LocationCountry;
