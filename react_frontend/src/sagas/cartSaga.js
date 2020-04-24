import { takeLatest, call, put } from "redux-saga/effects";
import {
    ADD_TO_CART_REQUESTED,
    CART_FETCH_REQUESTED,
    cartFetchSuccess,
    CHANGE_QUANTITY_REQUESTED,
    changeQuantitySuccess,
    REMOVE_PRODUCT_REQUESTED,
    removeProductSuccess
    // ADD_TO_CART_SUCCESSFUL,
    // addToCartSuccess
    // ADD_TO_CART_FAILED,
    // addToCartFailed
} from "../reduxActions/cartActions";

import { getCartProducts, addProductToCart, changeProductQuantityInCart, removeProductFromCart } from "../apiCalls/cart";
import history from '../history';

function *initiateAddToCartRequest (data) {
    try {
        const payload = data.payload;
        console.log("AddToCartRequest payload is-------------", payload);
        const response = yield call(addProductToCart, payload.productCode, payload.qty, payload.sessionId);
        console.log("AddToCartRequest response is-------------", response);
        if (response) {
            // yield put(addToCartSuccess(payload));
            history.push("/cart");
        } else {
            console.log("products not returned in AddToCartRequest");
        }
    } catch (e) {
        console.log("AddToCartRequest err is-------------", e);
        // yield put(authFailed());
        // yield history.push("/login");
    }
}

export function *watchAddToCartRequested () {
    yield takeLatest(ADD_TO_CART_REQUESTED, initiateAddToCartRequest);
}

function *initiateFetchCartRequest (data) {
    try {
        const payload = data.payload;
        console.log("FetchCartRequest payload is-------------", payload);
        const response = yield call(getCartProducts, payload.sessionId);
        console.log("FetchCartRequest response is-------------", response);
        if (!response.error) {
            yield put(cartFetchSuccess(response));
        } else {
            console.log("products not returned in FetchCartRequest");
        }
    } catch (e) {
        console.log("FetchCartRequest err is-------------", e);
    }
}

export function *watchFetchCartRequested () {
    yield takeLatest(CART_FETCH_REQUESTED, initiateFetchCartRequest);
}

function *initiateChangeQuantityRequest (data) {
    try {
        const payload = data.payload;
        console.log("ChangeQuantityRequest payload is-------------", payload);
        const response = yield call(changeProductQuantityInCart, payload.productCode, payload.qty, payload.sessionId);
        console.log("ChangeQuantityRequest response is-------------", response);
        if (!response.error) {
            yield put(changeQuantitySuccess(payload));
        } else {
            console.log("products not returned in ChangeQuantityRequest");
        }
    } catch (e) {
        console.log("ChangeQuantityRequest err is-------------", e);
    }
}

export function *watchChangeQuantityRequested () {
    yield takeLatest(CHANGE_QUANTITY_REQUESTED, initiateChangeQuantityRequest);
}

function *initiateRemoveProductRequest (data) {
    try {
        const payload = data.payload;
        console.log("RemoveProductRequest payload is-------------", payload);
        const response = yield call(removeProductFromCart, payload.productCode, payload.sessionId);
        console.log("RemoveProductRequest response is-------------", response);
        if (!response.error) {
            yield put(removeProductSuccess(payload.productCode));
        } else {
            console.log("products not returned in RemoveProductRequest");
        }
    } catch (e) {
        console.log("RemoveProductRequest err is-------------", e);
    }
}

export function *watchRemoveProductRequested () {
    yield takeLatest(REMOVE_PRODUCT_REQUESTED, initiateRemoveProductRequest);
}
