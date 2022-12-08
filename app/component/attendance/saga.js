import { put, takeEvery, delay, call } from "redux-saga/effects";
import { getMethod, postMethod } from "../common/services";
import * as actions from "./actions";
import { PUNCH_IN, PUNCH_OUT } from "./constants";



function* punchInAction(data) {
    try {
        let req = {
            url:'attendance-api/punchin',
            data:data?.data || {}
        }
        console.log("===== req", req);
        let response = yield call(postMethod, req);
     //   console.log("===== response", response?.data);
        yield put(actions.punchInSuccess(response?.data))
     } catch (e) {
        console.log("===== e", e);
        yield put(actions.punchInFailure("Punch in error"))
     }
}

function* punchOutAction(data){
   try {
        let req = {
            url:'attendance-api/punchout',
            data:data?.data || {}
        }
        let response = yield call(postMethod, req);
        yield put(actions.punchOutSuccess(response?.data))
     } catch (e) {
        yield put(actions.punchOutFailure("Punch out error"))
     }
}


export function* attendanceWatchers() {
    yield takeEvery(PUNCH_IN, punchInAction);
    yield takeEvery(PUNCH_OUT, punchOutAction);
}