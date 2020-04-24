import { apiServer } from "../../config.json";

export const getProducts = (sessionId) => {
    return fetch(apiServer + "/products", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "sessionId": sessionId
        }
    }).then(response => response.json());
};
