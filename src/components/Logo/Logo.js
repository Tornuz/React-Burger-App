import React from "react";
import classes from './Logo.module.css';

import burgerLogo from '../../../src/assets/images/27.1 burger-logo.png'
const logo = (props) => (

    <div className={classes.Logo}>
        <img src={burgerLogo}  alt="My Burger"/>
    </div>
);


export default logo;