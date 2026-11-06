import React from "react";
import classes from "./Continents.module.css";

interface ContinentsProps {
  continent: string;
  isActive?: boolean;
  onclick?: () => void;
}

const Continents = ({ continent, isActive, onclick }: ContinentsProps) => {
  return (
    <>
      <p 
        className={`${classes.continents} ${isActive ? classes.active : ''}`}
        onClick={onclick}
      >
        {continent}
      </p>
    </>
  );
};

export default Continents;
