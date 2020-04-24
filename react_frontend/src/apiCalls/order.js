import { apiServer } from "../../config.json";

export const confirmOrder = (sessionId) => {
    return fetch(apiServer + "/confirmOrder", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "sessionId": sessionId
        }
    }).then(response => response.json());
};
