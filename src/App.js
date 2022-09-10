import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";



const Auth = React.lazy(() => import('./containers/Auth/Auth'))
const Orders = React.lazy(() => import('./containers/Orders/Orders'))
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'))

const App = props => {

  useEffect(() => {
    props.onTryAutoSignup();
  },[])
  
    let routes = (
      <Routes>
        <Route path="/" element={<BurgerBuilder />} />
        <Route path="/auth/*" element={
              <React.Suspense fallback={<>...</>}>
                <Auth />
              </React.Suspense>} />
        <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>
    )
     if (props.isAuthenticated) {
        routes = (
          <Routes>
            <Route path="/" element={<BurgerBuilder />} />
            <Route path="/orders/*" element={
              <React.Suspense fallback={<>...</>}>
                <Orders />
              </React.Suspense>} />
            <Route path="/logout/*" element={<Logout />} />
            <Route path="/auth/*" element={<React.Suspense fallback={<>...</>}>
                <Auth />
              </React.Suspense>} />
            <Route path="/checkout/*" element={
              <React.Suspense fallback={<>...</>}>
                <Checkout />
              </React.Suspense>} />
            
          </Routes>
        )
     }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div> 
    );
  }


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
