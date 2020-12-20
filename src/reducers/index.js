import loggedReducer from "./isLogged";
import cartReducer from "./cart";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    cart: cartReducer,
    isLogged: loggedReducer,
});

export default allReducers;
