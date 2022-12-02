import { put, takeEvery, delay, call } from "redux-saga/effects";
import { postMethod } from "../common/services";
import * as actions from "./actions";
import { CHECK_SESSION } from "./constants";

function* checkSessionActon(data){
   try {
        let req = {
            url:'login-api/sessionchk/',
            data:data?.data || {}
        }
        let response = yield call(postMethod, req);
        yield put(actions.checkSessionSuccess(response?.data))
     } catch (e) {
        yield put(actions.checkSessionFailure("Session check error"))
     }
}


export function* checkSessionWatchers() {
    yield takeEvery(CHECK_SESSION, checkSessionActon);
 
}