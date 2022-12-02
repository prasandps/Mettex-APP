import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, REGISTERATION, REGISTERATION_SUCCESS, REGISTERATION_FAILURE, VALID_SESSION } from './constants';

const defaultState = {
    isLoading: false,
    loginData: {},
    registrationData:{},
    isValidSession:false
}

export default (prevState = defaultState, action) => {
    switch (action.type) {
        case VALID_SESSION:
            console.log("=== action", action);
            return {
                ...prevState,
                isValidSession:action.isValidSession
            }

        case LOGIN:
            return {
                ...prevState,
                isLoading: true
            }

        case LOGIN_SUCCESS:
            return {
                ...prevState,
                loginData: action.loginData,
                isLoading: false
            }

        case LOGIN_FAILURE:
            return {
                ...prevState,
                error: action.error,
                isLoading: false
            }

        case REGISTERATION:
            return {
                ...prevState,
                isLoading: true
            }

        case REGISTERATION_SUCCESS:
            return {
                ...prevState,
                registrationData: action.registrationData,
                isLoading: false
            }

        case REGISTERATION_FAILURE:
            return {
                ...prevState,
                error: action.error,
                isLoading: false
            }

        default:
            return {
                ...prevState
            };
    }
}