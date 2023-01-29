import { GET_DASHBOARD_INFO, GET_DASHBOARD_INFO_FAILURE, GET_DASHBOARD_INFO_SUCCESS } from "./constants"

export function getDashboardInfo(data) {
    return {
        type:GET_DASHBOARD_INFO,
        data
    }
}

export function getDashboardInfoSuccess(payload) {
    return {
        type: GET_DASHBOARD_INFO_SUCCESS,
        payload
    }
}

export function getDashboardInfoFailure(error) {
    return {
        type: GET_DASHBOARD_INFO_FAILURE,
        error
    }
}


