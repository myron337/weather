import React from 'react';
import classes from './Container.module.css';

interface ContainerProps {
    children: React.ReactNode;
}
const Container = ({ children }: ContainerProps) => {
    return (
        <div className={classes.container}>
            {children}
        </div>
    );
}

export default Container;
