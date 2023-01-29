import { GET_DASHBOARD_INFO, GET_DASHBOARD_INFO_FAILURE, GET_DASHBOARD_INFO_SUCCESS } from "./constants"

const defaultState = {
    isLoading: false,
    dashbaordInfo: {},
   
}

export default (prevState = defaultState, action) => {
    switch (action.type) {

        case GET_DASHBOARD_INFO:
            return {
                ...prevState,
                isLoading: true,
                dashbaordInfo: {}
            }

        case GET_DASHBOARD_INFO_SUCCESS:
            return {
                ...prevState,
                dashbaordInfo: action.payload,
                isLoading: false
            }

        case GET_DASHBOARD_INFO_FAILURE:
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