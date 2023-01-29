import { GET_LEAVE_PENDING, GET_LEAVE_PENDING_FAILURE, GET_LEAVE_PENDING_SUCCESS } from "./constants"

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
