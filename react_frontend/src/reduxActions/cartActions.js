// actions for adding products to cart
export const ADD_TO_CART_REQUESTED = "ADD_TO_CART_REQUESTED";
export const addToCartRequest = (payload) => {
    return { type: ADD_TO_CART_REQUESTED, payload };
};

export const ADD_TO_CART_SUCCESSFUL = "ADD_TO_CART_SUCCESSFUL";
export const addToCartSuccess = (payload) => {
    return { type: ADD_TO_CART_SUCCESSFUL, payload };
};

export const ADD_TO_CART_FAILED = "ADD_TO_CART_FAILED";
export const addToCartFailed = (payload) => {
    return { type: ADD_TO_CART_FAILED, payload };
};

// actions for fetching cart
export const CART_FETCH_REQUESTED = "CART_FETCH_REQUESTED";
export const cartFetchRequest = (payload) => {
    return { type: CART_FETCH_REQUESTED, payload };
};

export const CART_FETCH_SUCCESSFUL = "CART_FETCH_SUCCESSFUL";
export const cartFetchSuccess = (payload) => {
    return { type: CART_FETCH_SUCCESSFUL, payload };
};

export const CART_FETCH_FAILED = "CART_FETCH_FAILED";
export const cartFetchFailed = (payload) => {
    return { type: CART_FETCH_FAILED, payload };
};

// actions for changing product quantity in cart
export const CHANGE_QUANTITY_REQUESTED = "CHANGE_QUANTITY_REQUESTED";
export const changeQuantityRequest = (payload) => {
    return { type: CHANGE_QUANTITY_REQUESTED, payload };
};

export const CHANGE_QUANTITY_SUCCESSFUL = "CHANGE_QUANTITY_SUCCESSFUL";
export const changeQuantitySuccess = (payload) => {
    return { type: CHANGE_QUANTITY_SUCCESSFUL, payload };
};

export const CHANGE_QUANTITY_FAILED = "CHANGE_QUANTITY_FAILED";
export const changeQuantityFailed = (payload) => {
    return { type: CHANGE_QUANTITY_FAILED, payload };
};

// actions for removeing product from cart
export const REMOVE_PRODUCT_REQUESTED = "REMOVE_PRODUCT_REQUESTED";
export const removeProductRequest = (payload) => {
    return { type: REMOVE_PRODUCT_REQUESTED, payload };
};

export const REMOVE_PRODUCT_SUCCESSFUL = "REMOVE_PRODUCT_SUCCESSFUL";
export const removeProductSuccess = (payload) => {
    return { type: REMOVE_PRODUCT_SUCCESSFUL, payload };
};

export const REMOVE_PRODUCT_FAILED = "REMOVE_PRODUCT_FAILED";
export const removeProductFailed = (payload) => {
    return { type: REMOVE_PRODUCT_FAILED, payload };
};
