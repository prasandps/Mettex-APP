import { PUNCH_IN, 
    PUNCH_IN_DATA_CLEAR, 
    PUNCH_IN_FAILURE, 
    PUNCH_IN_SUCCESS, 
    PUNCH_OUT,
    PUNCH_OUT_DATA_CLEAR,
    PUNCH_OUT_FAILURE,
    PUNCH_OUT_SUCCESS} from "./constants"

export function punchIn(data) {
    return {
        type:PUNCH_IN,
        data
    }
}

export function punchInSuccess(punchInData) {
    return {
        type: PUNCH_IN_SUCCESS,
        punchInData
    }
}

export function punchInFailure(error) {
    return {
        type: PUNCH_IN_FAILURE,
        error
    }
}


export function punchInDataClear() {
    return {
        type: PUNCH_IN_DATA_CLEAR,
      
    }
}


export function punchOut(data) {
    return {
        type:PUNCH_OUT,
        data
    }
}

export function punchOutSuccess(punchOutData) {
    return {
        type: PUNCH_OUT_SUCCESS,
        punchOutData
    }
}

export function punchOutFailure(error) {
    return {
        type: PUNCH_OUT_FAILURE,
        error
    }
}

export function punchOutDataClear() {
    return {
        type: PUNCH_OUT_DATA_CLEAR,
      
    }
}