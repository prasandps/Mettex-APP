import { CREATE_LEAVE_REQUEST, CREATE_LEAVE_REQUEST_CLEAR, CREATE_LEAVE_REQUEST_FAILURE, CREATE_LEAVE_REQUEST_SUCCESS, CREATE_PREMISSION_REQUEST, CREATE_PREMISSION_REQUEST_CLEAR, CREATE_PREMISSION_REQUEST_FAILURE, CREATE_PREMISSION_REQUEST_SUCCESS, GET_LEAVE_PENDING, GET_LEAVE_PENDING_FAILURE, GET_LEAVE_PENDING_SUCCESS, UPDATE_LEAVE_REQUEST, UPDATE_LEAVE_REQUEST_CLEAR, UPDATE_LEAVE_REQUEST_FAILURE, UPDATE_LEAVE_REQUEST_SUCCESS } from "./constants"

const defaultState = {
    isLoading: false,
    leavePendingData: {},
    createLeaveReq: {},
    updateLeaveReq: {},
    premissionReq: {}
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

        case CREATE_LEAVE_REQUEST:
            return {
                ...prevState,
                isLoading: true,
                createLeaveReq: {}
            }

        case CREATE_LEAVE_REQUEST_SUCCESS:
            return {
                ...prevState,
                createLeaveReq: action.payload,
                isLoading: false
            }

        case CREATE_LEAVE_REQUEST_FAILURE:
            return {
                ...prevState,
                error: action.error,
                isLoading: false
            }
        case CREATE_LEAVE_REQUEST_CLEAR:
            return {
                ...prevState,
                error: '',
                createLeaveReq: {},
                isLoading: false
            }

        case UPDATE_LEAVE_REQUEST:
            return {
                ...prevState,
                isLoading: true,
                updateLeaveReq: {}
            }

        case UPDATE_LEAVE_REQUEST_SUCCESS:
            return {
                ...prevState,
                updateLeaveReq: action.payload,
                isLoading: false
            }

        case UPDATE_LEAVE_REQUEST_FAILURE:
            return {
                ...prevState,
                error: action.error,
                isLoading: false
            }
        case UPDATE_LEAVE_REQUEST_CLEAR:
            return {
                ...prevState,
                error: '',
                updateLeaveReq: {},
                isLoading: false
            }

        case CREATE_PREMISSION_REQUEST:
            return {
                ...prevState,
                isLoading: true,
                premissionReq: {}
            }

        case CREATE_PREMISSION_REQUEST_SUCCESS:
            return {
                ...prevState,
                premissionReq: action.payload,
                isLoading: false
            }

        case CREATE_PREMISSION_REQUEST_FAILURE:
            return {
                ...prevState,
                error: action.error,
                isLoading: false
            }
        case CREATE_PREMISSION_REQUEST_CLEAR:
            return {
                ...prevState,
                error: '',
                premissionReq: {},
                isLoading: false
            }
        default:
            return {
                ...prevState
            };
    }
}