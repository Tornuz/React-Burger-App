import React from "react";
import classes from "./Input.module.css";
import './Input.css';

const input = (props) => {

  let inputElement = null;
  

  switch (props.elementType) {
    case "input":
      inputElement = <input 
      {...props.elementConfig}
       value={props.value} 
       onChange={props.changed}
       className={
            (props.invalid && props.touched) ? "InputElement  Invalid" : "InputElement"
          } />;
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={
            props.invalid ? "InputElement  " : "InputElement"
          }
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={
            props.invalid ? "InputElement  " : "InputElement"
          }
          value={props.value}
          onChange={props.changed}>
            {props.elementConfig.options.map(option => (
                <option key = {option.value} value={option.value} >
                    {option.displayValue}
                </option>
            ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={
            props.invalid ? "InputElement  " : "InputElement"
          }
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
