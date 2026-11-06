import React from 'react';
import classes from './Location.module.css';

const Location = () => {
    return (
        <div className={classes.location}>
            <div className={classes.liveIcon}>
        
            </div>
        <p className={classes.locationText}>Your current location</p>
        </div>
    );
}

export default Location;
