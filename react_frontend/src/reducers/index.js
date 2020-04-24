import { combineReducers } from "redux";
import session from "./sessionReducer";
import product from "./productReducer";
import cart from "./cartReducer";

export default combineReducers({
    session,
    product,
    cart
});
