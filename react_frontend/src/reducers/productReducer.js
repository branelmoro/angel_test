import {
    PRODUCT_FETCH_REQUESTED,
    PRODUCT_FETCH_SUCCESSFUL,
    PRODUCT_FETCH_FAILED
} from "../reduxActions/productActions";

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_FETCH_REQUESTED:
            break;
        case PRODUCT_FETCH_SUCCESSFUL:
            console.log(action.payload);
            return action.payload;
            // return Object.assign({}, state, action.payload);
            break;
        case PRODUCT_FETCH_FAILED:
            break;
    }
    return state;
};
