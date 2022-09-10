import React, { useState } from "react";
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import { connect } from 'react-redux';

const Layout = props => {

    const [sideDrawerVisible, setSideDrawerVisible] = useState(false)

const sideDrawerClosedHandler = () => {
    setSideDrawerVisible(false)
}

const sideDrawerToggleHandler = () => {
    setSideDrawerVisible(!sideDrawerVisible)
}


    return (
        <Aux>
        <Toolbar
            isAuth = {props.isAuthenticated}
          drawerToggleClicked={sideDrawerToggleHandler}/>
        <SideDrawer 
            isAuth = {props.isAuthenticated}
            open={sideDrawerVisible}
            closed={sideDrawerClosedHandler}
        />
        
        <main className={classes.content}>
            {props.children}
        </main>
        </Aux>
    )
  }

const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(Layout);