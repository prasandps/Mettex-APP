import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, REGISTERATION, REGISTERATION_SUCCESS, REGISTERATION_FAILURE } from "./constants";

export function login(data) {
    return {
        type:LOGIN,
        data
    }
}

export function loginSuccess(loginData) {
    return {
        type: LOGIN_SUCCESS,
        loginData
    }
}

export function loginFailure(error) {
    return {
        type: LOGIN_FAILURE,
        error
    }
}


export function registeration(data) {
    return {
        type:REGISTERATION,
        data
    }
}

export function registerationSuccess(registrationData) {
    return {
        type: REGISTERATION_SUCCESS,
        registrationData
    }
}

export function registerationFailure(error) {
    return {
        type: REGISTERATION_FAILURE,
        error
    }
}