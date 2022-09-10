import { useLocation, useNavigate } from "react-router-dom";

export function withNavigate(Component) {
  return (props) => (
   <Component {...props} location = {useLocation()} navigate={useNavigate()} />
);
}