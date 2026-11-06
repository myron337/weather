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
            <h2>{country}</h2>
           <div className={classes.locationDetails}>
            <p>{city} ·</p>
            <p>{time}</p>
            </div>
        </div>
    );
}

export default LocationCountry;
