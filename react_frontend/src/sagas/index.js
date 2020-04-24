import { all, fork } from "redux-saga/effects";

import { watchProductFetchRequested } from "./productSaga";
import {
    watchFetchCartRequested,
    watchAddToCartRequested,
    watchChangeQuantityRequested,
    watchRemoveProductRequested
} from "./cartSaga";
import { watchconfirmOrderRequested } from "./orderSaga";

const allSagas = [
    watchProductFetchRequested,
    watchFetchCartRequested,
    watchAddToCartRequested,
    watchChangeQuantityRequested,
    watchRemoveProductRequested,
    watchconfirmOrderRequested
];

export default function *rootSaga () {
    // yield all(allSagas.map(saga => saga()));
    // yield all(allSagas.map(saga => fork(saga)));
    yield all(allSagas.map(fork));
}
