import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { Route, Routes, Navigate } from "react-router-dom";
import * as actions from '../../../store/actions/index';

const Logout = props => {

    useEffect(() => {
        props.onLogout();
    },[])

        return <Routes>
        <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>
    
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(null,mapDispatchToProps)(Logout);