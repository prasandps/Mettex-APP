import { put, takeEvery, delay, call } from "redux-saga/effects";
import { getMethod, postMethod } from "../common/services";
import * as actions from "./actions";
import { GET_LEAVE_PENDING } from "./constants";


function* getLeavePendingAction(data){
  
   try {
        let req = {
            url:'leave-api/',
            data:data?.data || {}
        }
        let response = yield call(postMethod, req);
        yield put(actions.getLeavePendingSuccess(response?.data))
     } catch (e) {
        yield put(actions.getLeavePendingFailure("Leave pending error"))
     }
}


export function* leaveWatchers() {
    yield takeEvery(GET_LEAVE_PENDING, getLeavePendingAction);
}