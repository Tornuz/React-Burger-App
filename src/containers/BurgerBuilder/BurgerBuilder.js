import React, { useState, useEffect } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import { connect } from "react-redux/es/exports";
import { withNavigate } from "./hooks";
import * as burgerBuilderActions from "../../store/actions/index";
// import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";

 const BurgerBuilder = props => {

  const [purchasing, setPurchasing] = useState(false)

  useEffect(() => {
    props.onInItIngredients();
  },[])

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.onSetAuthRedirectPath("/checkout");
      const { navigate } = props;
      navigate({
        pathname: "/auth",
      });
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false)
  };

  const purchaseContinueHandler = () => {
    // alert('You Continue!');
    props.onInitPurchase();

    const { navigate } = props;
    navigate({
      pathname: "/checkout",
    });
  };


    const disabledInfo = {
      ...props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    //salad: true ,meat:false and so on acc to their values
    let orderSummary = null;

    let burger = props.error ? (
      <h1>Obviously, Ingredients cant be loaded</h1>
    ) : (
      <Spinner />
    );

    if (props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={props.ings} />
          <BuildControls
            ingredientAdded={props.onIngredientAdded}
            ingredientRemoved={props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={updatePurchaseState(props.ings)}
            ordered={purchaseHandler}
            isAuth={props.isAuthenticated}
            price={props.price}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          purchaseCancelled={purchaseCancelHandler}
          purchaseContinue={purchaseContinueHandler}
          ingredients={props.ings}
          price={props.price}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={purchasing}
          modalClosed={purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>

        {burger}
      </Aux>
    );
  }


const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInItIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
    onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(burgerBuilderActions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigate(BurgerBuilder));
// export default withErrorHandler (BurgerBuilder, axios);
