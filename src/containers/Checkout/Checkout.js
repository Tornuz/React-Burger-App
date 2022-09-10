import React from "react";
import { withNavigate } from "../BurgerBuilder/hooks";
import CheckoutSummary from "../../components/Order/ChekoutSummary/CheckoutSummary";
import { Route, Routes, Navigate } from "react-router-dom";
import { connect } from "react-redux/es/exports";
import ContactData from "./ContactData/ContactData";

const Checkout = props => {

  const checkoutCancelledHandler = () => {
    const { navigate } = props;
    navigate(-1);
  };
  const checkoutContinuedHandler = () => {
    const { navigate } = props;
    navigate("/checkout/contact-data");
  };


    let summary = <Routes>
      <Route path="*" element={<Navigate to="/" replace />}/>
    </Routes>
    if(props.ings) {
      const purchasedRedirect = props.purchased ? <Routes>
      <Route path="*" element={<Navigate to="/" replace />}/>
    </Routes>: null
      summary = (
        <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={props.ings}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
          />
          <Routes>
          <Route  path = "/contact-data" element={<ContactData/>} />
          </Routes>
          </div>
      );
    }

    return summary;
     
  }

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  
  }
}

export default connect(mapStateToProps)(withNavigate(Checkout));
