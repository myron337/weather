import React from 'react';
import classes from './GraphContainer.module.css';
import GraphItem from '../graphItem/GraphItem';

const GraphContainer = () => {
    return (
        <div className={classes.graphContainer}>
            <GraphItem score={"Hottest"} temperature={39} unit="°C" country="Uae" imgSrc="/icons/thermometer-warmer.svg" />
            <GraphItem score={"Coldest"} temperature={-15} unit="°C" country="Russia" imgSrc="/icons/thermometer-colder.svg" />
            <GraphItem score={"Windiest"} temperature={75} unit="km/h" country="Iceland" imgSrc="/icons/wind.svg" />
            <GraphItem score={"Most humid"} temperature={92} unit="%" country="Thailand" imgSrc="/icons/humidity.svg" />
        </div>
    );
}

export default GraphContainer;
