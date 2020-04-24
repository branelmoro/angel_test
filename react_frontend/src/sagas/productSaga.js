import { takeLatest, call, put } from "redux-saga/effects";
import {
    PRODUCT_FETCH_REQUESTED,
    // PRODUCT_FETCH_SUCCESSFUL,
    productFetchSuccess
    // PRODUCT_FETCH_FAILED,
    // productFetchFailed
} from "../reduxActions/productActions";
import { getProducts } from "../apiCalls/product";

function *initiateProductFetchRequest (data) {
    try {
        console.log("ProductFetchRequest sessionId is-------------", data.payload);
        const products = yield call(getProducts, data.payload);
        console.log("ProductFetchRequest response is-------------", products);
        if (products) {
            yield put(productFetchSuccess(products));
        } else {
            console.log("products not returned in ProductFetchRequest");
        }
    } catch (e) {
        console.log("ProductFetchRequest err is-------------", e);
        // yield put(authFailed());
        // yield history.push("/login");
    }
}

export function *watchProductFetchRequested () {
    yield takeLatest(PRODUCT_FETCH_REQUESTED, initiateProductFetchRequest);
}
