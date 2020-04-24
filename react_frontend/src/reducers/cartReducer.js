import {
    ADD_TO_CART_REQUESTED,
    ADD_TO_CART_SUCCESSFUL,
    ADD_TO_CART_FAILED,
    CART_FETCH_REQUESTED,
    CART_FETCH_SUCCESSFUL,
    CART_FETCH_FAILED,
    CHANGE_QUANTITY_REQUESTED,
    CHANGE_QUANTITY_SUCCESSFUL,
    CHANGE_QUANTITY_FAILED,
    REMOVE_PRODUCT_REQUESTED,
    REMOVE_PRODUCT_SUCCESSFUL,
    REMOVE_PRODUCT_FAILED
} from "../reduxActions/cartActions";

import {
    CONFIRM_ORDER_SUCCESSFUL
} from "../reduxActions/orderActions";

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART_REQUESTED:
            break;
        case ADD_TO_CART_SUCCESSFUL:
            // return Object.assign({}, state, action.payload);
            break;
        case ADD_TO_CART_FAILED:
            break;
        case CART_FETCH_REQUESTED:
            break;
        case CART_FETCH_SUCCESSFUL:
            return action.payload.products;
            break;
        case CART_FETCH_FAILED:
            break;
        case CHANGE_QUANTITY_REQUESTED:
            break;
        case CHANGE_QUANTITY_SUCCESSFUL:
            return state.map(cartProduct => {
                if (cartProduct.productCode === action.payload.productCode) {
                    cartProduct.quantity = action.payload.qty;
                }
                return cartProduct;
            });
            break;
        case CHANGE_QUANTITY_FAILED:
            break;
        case REMOVE_PRODUCT_REQUESTED:
            break;
        case REMOVE_PRODUCT_SUCCESSFUL:
            return state.filter((cartProduct) => cartProduct.productCode === action.payload);
            break;
        case REMOVE_PRODUCT_FAILED:
            break;
        case CONFIRM_ORDER_SUCCESSFUL:
            // make cart empty
            return [];
            break;
    }
    return state;
};
