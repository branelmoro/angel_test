// actions for ordering cart
export const CONFIRM_ORDER_REQUESTED = "CONFIRM_ORDER_REQUESTED";
export const confirmOrderRequest = (payload) => {
    return { type: CONFIRM_ORDER_REQUESTED, payload };
};

export const CONFIRM_ORDER_SUCCESSFUL = "CONFIRM_ORDER_SUCCESSFUL";
export const confirmOrderSuccess = (payload) => {
    return { type: CONFIRM_ORDER_SUCCESSFUL, payload };
};

export const CONFIRM_ORDER_FAILED = "CONFIRM_ORDER_FAILED";
export const confirmOrderFailed = (payload) => {
    return { type: CONFIRM_ORDER_FAILED, payload };
};
