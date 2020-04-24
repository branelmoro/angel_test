// actions for fetching products
export const PRODUCT_FETCH_REQUESTED = "PRODUCT_FETCH_REQUESTED";
export const productFetchRequest = (payload) => {
    return { type: PRODUCT_FETCH_REQUESTED, payload };
};

export const PRODUCT_FETCH_SUCCESSFUL = "PRODUCT_FETCH_SUCCESSFUL";
export const productFetchSuccess = (payload) => {
    return { type: PRODUCT_FETCH_SUCCESSFUL, payload };
};

export const PRODUCT_FETCH_FAILED = "PRODUCT_FETCH_FAILED";
export const productFetchFailed = (payload) => {
    return { type: PRODUCT_FETCH_FAILED, payload };
};
