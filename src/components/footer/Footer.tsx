import React from "react";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={classes.footer}>
      <p className={classes.footerText}>
        &copy; 2026 Weather App. All rights reserved.
        Non-commercial use only.
      </p>
    </div>
  );
};

export default Footer;
