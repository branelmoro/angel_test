import { apiServer } from "../../config.json";

export const validateSession = (sessionId) => {
    return Promise.resolve({
        sessionId: sessionId
    });
    return fetch(apiServer + "/session", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "sessionId": sessionId
        }
    }).then(response => response.json());
};


export const createNewSession = () => {
    return fetch(apiServer + "/session", {
        method: "POST"
    }).then(response => response.json());
};
