import { GET_LEAVE_PENDING, GET_LEAVE_PENDING_FAILURE, GET_LEAVE_PENDING_SUCCESS } from "./constants"

const defaultState = {
    isLoading: false,
    leavePendingData: {}
}

export default (prevState = defaultState, action) => {
    switch (action.type) {

        case GET_LEAVE_PENDING:
            return {
                ...prevState,
                isLoading: true,
                leavePendingData: {}
            }

        case GET_LEAVE_PENDING_SUCCESS:
            return {
                ...prevState,
                leavePendingData: action.payload,
                isLoading: false
            }

        case GET_LEAVE_PENDING_FAILURE:
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