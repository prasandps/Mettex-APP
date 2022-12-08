import { CHECK_SESSION, CHECK_SESSION_FAILURE, CHECK_SESSION_SUCCESS, CLEAR_SESSION } from './constants';

const defaultState = {
    isLoading: false,
    sessionData: {}

}

export default (prevState = defaultState, action) => {
    switch (action.type) {
        case CHECK_SESSION:
            return {
                ...prevState,
                isLoading: true
            }

        case CHECK_SESSION_SUCCESS:
            return {
                ...prevState,
                sessionData: action.sessionData,
                isLoading: false
            }

        case CHECK_SESSION_FAILURE:
            return {
                ...prevState,
                error: action.error,
                isLoading: false
            }
        
        case CLEAR_SESSION:
            return {
                ...prevState,
                sessionData:{}
            }

        default:
            return {
                ...prevState
            };
    }
}