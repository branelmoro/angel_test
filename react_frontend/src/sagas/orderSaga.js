import { takeLatest, call, put } from "redux-saga/effects";
import {
    CONFIRM_ORDER_REQUESTED,
    // CONFIRM_ORDER_SUCCESSFUL,
    confirmOrderSuccess
    // CONFIRM_ORDER_FAILED,
    // confirmOrderFailed
} from "../reduxActions/orderActions";
import { confirmOrder } from "../apiCalls/order";
import history from '../history';

function *initiateconfirmOrderRequest (data) {
    try {
        console.log("confirmOrderRequest sessionId is-------------", data.payload.sessionId);
        const response = yield call(confirmOrder, data.payload.sessionId);
        console.log("confirmOrderRequest response is-------------", response);
        if (!response.error) {
            yield put(confirmOrderSuccess(response));
            history.push("/thankyou");
        } else {
            console.log("confirmOrderRequest failed---", response);
        }
    } catch (e) {
        console.log("confirmOrderRequest err is-------------", e);
        // yield put(authFailed());
        // yield history.push("/login");
    }
}

export function *watchconfirmOrderRequested () {
    yield takeLatest(CONFIRM_ORDER_REQUESTED, initiateconfirmOrderRequest);
}
