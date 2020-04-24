import { apiServer } from "../../config.json";

export const getCartProducts = (sessionId) => {
    return fetch(apiServer + "/cart", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "sessionId": sessionId
        }
    }).then(response => response.json());
};

export const addProductToCart = (productCode, qty, sessionId) => {
    qty = parseInt(qty, 10);
    return fetch(apiServer + "/cart/add/" + productCode, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "sessionId": sessionId
        },
        body: JSON.stringify({ quantity: qty })
    }).then(response => response.json());
};

export const changeProductQuantityInCart = (productCode, qty, sessionId) => {
    qty = parseInt(qty, 10);
    return fetch(apiServer + "/cart/changeQty/" + productCode, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            "sessionId": sessionId
        },
        body: JSON.stringify({ quantity: qty })
    }).then(response => response.json());
};

export const removeProductFromCart = (productCode, sessionId) => {
    return fetch(apiServer + "/cart/remove/" + productCode, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            "sessionId": sessionId
        }
    }).then(response => response.json());
};
