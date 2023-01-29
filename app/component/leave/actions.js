import { CREATE_LEAVE_REQUEST, CREATE_LEAVE_REQUEST_CLEAR, CREATE_LEAVE_REQUEST_FAILURE, CREATE_LEAVE_REQUEST_SUCCESS, CREATE_PREMISSION_REQUEST, CREATE_PREMISSION_REQUEST_CLEAR, CREATE_PREMISSION_REQUEST_FAILURE, CREATE_PREMISSION_REQUEST_SUCCESS, GET_LEAVE_PENDING, GET_LEAVE_PENDING_FAILURE, GET_LEAVE_PENDING_SUCCESS, UPDATE_LEAVE_REQUEST, UPDATE_LEAVE_REQUEST_CLEAR, UPDATE_LEAVE_REQUEST_FAILURE, UPDATE_LEAVE_REQUEST_SUCCESS } from "./constants"

export function getLeavePendingReq(data) {
    return {
        type:GET_LEAVE_PENDING,
        data
    }
}

export function getLeavePendingSuccess(payload) {
    return {
        type: GET_LEAVE_PENDING_SUCCESS,
        payload
    }
}

export function getLeavePendingFailure(error) {
    return {
        type: GET_LEAVE_PENDING_FAILURE,
        error
    }
}


export function createLeaveRequest(data) {
    return {
        type:CREATE_LEAVE_REQUEST,
        data
    }
}

export function createLeaveRequestSuccess(payload) {
    return {
        type: CREATE_LEAVE_REQUEST_SUCCESS,
        payload
    }
}

export function createLeaveRequestFailure(error) {
    return {
        type: CREATE_LEAVE_REQUEST_FAILURE,
        error
    }
}

export function createLeaveRequestClear() {
    return {
        type: CREATE_LEAVE_REQUEST_CLEAR,
        
    }
}

export function updateLeaveRequest(data) {
    return {
        type:UPDATE_LEAVE_REQUEST,
        data
    }
}

export function updateLeaveRequestSuccess(payload) {
    return {
        type: UPDATE_LEAVE_REQUEST_SUCCESS,
        payload
    }
}

export function updateLeaveRequestFailure(error) {
    return {
        type: UPDATE_LEAVE_REQUEST_FAILURE,
        error
    }
}

export function updateLeaveRequestClear() {
    return {
        type: UPDATE_LEAVE_REQUEST_CLEAR,
        
    }
}


export function premissionRequest(data) {
    return {
        type:CREATE_PREMISSION_REQUEST,
        data
    }
}

export function premissionRequestSuccess(payload) {
    return {
        type: CREATE_PREMISSION_REQUEST_SUCCESS,
        payload
    }
}

export function premissionRequestFailure(error) {
    return {
        type: CREATE_PREMISSION_REQUEST_FAILURE,
        error
    }
}

export function premissionRequestRequestClear() {
    return {
        type: CREATE_PREMISSION_REQUEST_CLEAR,
        
    }
}
