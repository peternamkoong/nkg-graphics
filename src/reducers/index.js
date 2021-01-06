import loggedReducer from "./isLogged";
import cartReducer from "./cart";
import filterReducer from "./filter";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    cart: cartReducer,
    isLogged: loggedReducer,
    filter: filterReducer,
});

export default allReducers;
