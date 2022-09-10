import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { legacy_createStore as createStore, applyMiddleware, compose, combineReducers} from "redux";
import burgerBuilderReducer from "./store/reducer/burgerBuilder";
import reportWebVitals from "./reportWebVitals";
import thunk from 'redux-thunk';
import createSagaMiddleware from "@redux-saga/core";
import orderReducer from './store/reducer/order';
import authReducer from './store/reducer/auth';
import { watchAuth, watchBurgerBuilder, watchOder } from './store/sagas/index';

// const composeEnhancer = process.env.NODE_ENV === 'developement' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: null || compose;
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer,composeEnhancer(
  applyMiddleware(thunk, sagaMiddleware)));

sagaMiddleware.run(watchAuth)
sagaMiddleware.run(watchBurgerBuilder)
sagaMiddleware.run(watchOder)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
