// actions for session authentication
export const SESSION_AUTH_REQUESTED = "SESSION_AUTH_REQUESTED";
export const sessionAuthRequest = (payload) => {
    return { type: SESSION_AUTH_REQUESTED, payload };
};

export const SESSION_AUTH_SUCCESSFUL = "SESSION_AUTH_SUCCESSFUL";
export const sessionAuthSuccess = (payload) => {
    return { type: SESSION_AUTH_SUCCESSFUL, payload };
};

export const SESSION_AUTH_FAILED = "SESSION_AUTH_FAILED";
export const sessionAuthFailed = (payload) => {
    return { type: SESSION_AUTH_FAILED, payload };
};


// actions for session creation
export const SESSION_CREATE_REQUESTED = "SESSION_CREATE_REQUESTED";
export const sessionCreateRequested = (payload) => {
    return { type: SESSION_CREATE_REQUESTED, payload };
};

export const SESSION_CREATE_SUCCESSFUL = "SESSION_CREATE_SUCCESSFUL";
export const sessionCreateSuccess = (payload) => {
    return { type: SESSION_CREATE_SUCCESSFUL, payload };
};

export const SESSION_CREATE_FAILED = "SESSION_CREATE_FAILED";
export const sessionCreateFailed = (payload) => {
    return { type: SESSION_CREATE_FAILED, payload };
};
