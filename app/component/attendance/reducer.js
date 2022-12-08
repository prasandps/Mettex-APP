import {
    PUNCH_IN,
    PUNCH_IN_DATA_CLEAR,
    PUNCH_IN_FAILURE,
    PUNCH_IN_SUCCESS,
    PUNCH_OUT,
    PUNCH_OUT_DATA_CLEAR,
    PUNCH_OUT_FAILURE,
    PUNCH_OUT_SUCCESS
} from "./constants"

const defaultState = {
    isLoading: false,
    punchInData: {},
    punchOutData: {}
}

export default (prevState = defaultState, action) => {
    switch (action.type) {

        case PUNCH_IN:
            return {
                ...prevState,
                isLoading: true,
                punchInData: {},
                punchOutData: {}
            }

        case PUNCH_IN_SUCCESS:
            return {
                ...prevState,
                punchInData: action.punchInData,
                isLoading: false
            }

        case PUNCH_IN_FAILURE:
            return {
                ...prevState,
                error: action.error,
                isLoading: false
            }

        case PUNCH_IN_DATA_CLEAR:
            return {
                ...prevState,
                punchInData: {}
            }

        case PUNCH_OUT:
            return {
                ...prevState,
                isLoading: true,
                punchInData: {},
                punchOutData: {}
            }

        case PUNCH_OUT_SUCCESS:
            return {
                ...prevState,
                punchOutData: action.punchOutData,
                isLoading: false
            }

        case PUNCH_OUT_FAILURE:
            return {
                ...prevState,
                error: action.error,
                isLoading: false
            }

        case PUNCH_OUT_DATA_CLEAR:
            return {
                ...prevState,
                punchOutData: {}
            }

        default:
            return {
                ...prevState
            };
    }
}