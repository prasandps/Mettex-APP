import { CHECK_SESSION, CHECK_SESSION_FAILURE, CHECK_SESSION_SUCCESS } from "./constants";

export function checkSession(data) {
    return {
        type:CHECK_SESSION,
        data
    }
}

export function checkSessionSuccess(sessionData) {
    return {
        type: CHECK_SESSION_SUCCESS,
        sessionData
    }
}

export function checkSessionFailure(error) {
    return {
        type: CHECK_SESSION_FAILURE,
        error
    }
}

