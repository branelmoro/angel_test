import {
    SESSION_AUTH_REQUESTED,
    SESSION_AUTH_SUCCESSFUL,
    SESSION_AUTH_FAILED,
    SESSION_CREATE_REQUESTED,
    SESSION_CREATE_SUCCESSFUL,
    SESSION_CREATE_FAILED
} from "../reduxActions/sessionActions";

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case SESSION_AUTH_REQUESTED:
            break;
        case SESSION_AUTH_SUCCESSFUL:
            break;
        case SESSION_AUTH_FAILED:
            break;
        case SESSION_CREATE_REQUESTED:
            break;
        case SESSION_CREATE_SUCCESSFUL:
            return Object.assign({}, state, action.payload);
            break;
        case SESSION_CREATE_FAILED:
            break;
    }
    return state;
};
