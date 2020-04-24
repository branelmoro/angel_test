import { matchPath } from "react-router-dom";
import routes from "../routes";
import { validateSession, createNewSession } from "../apiCalls/session";

import home from "./home";

export default async (req) => {
    const activeRoute = routes.find(route => matchPath(req.url, route)) || {};

    console.log("activeRoute is--------", activeRoute);

    const initialState = {
        reducer1: {
            articles: [
                {
                    id: 233534,
                    title: "123"
                },
                {
                    id: 233536,
                    title: "456"
                },
                {
                    id: 233537,
                    title: "789"
                }
            ]
        }
    };

    console.log("initialState state is---", req.cookies);
    if (req.cookies && req.cookies.sessionId) {
        let sessionDetails = await validateSession(req.cookies.sessionId);
        if (sessionDetails.sessionId) {
            initialState.session = sessionDetails;
        }
    }

    if (!initialState.session) {
        let sessionDetails = await createNewSession();
        if (sessionDetails.sessionId) {
            initialState.session = sessionDetails;
        }
    }

    switch (activeRoute.path) {
        case "/":
            return await home(req, initialState);
        default:
            return initialState;
    }
};
