import React from 'react';
import classes from './ButtonDegree.module.css';

interface ButtonDegreeProps {
    buttonText: string;
    isActive: boolean;
    onClick?: () => void;
}
const ButtonDegree = ({buttonText, isActive, onClick}: ButtonDegreeProps ) => {
    return (
        <button className={`${classes.button} ${isActive ? classes.isActive : ''}`} onClick={onClick}>
            {buttonText}

        </button>
    );
}

export default ButtonDegree;
