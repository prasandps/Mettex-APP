import { put, takeEvery, delay, call } from "redux-saga/effects";
import { getMethod, postMethod } from "../common/services";
import * as actions from "./actions";
import { LOGIN, REGISTERATION } from "./constants";



function* loginActon(data) {
    try {
        let req = {
            url:'login-api/login/',
            data:data?.data || {}
        }
        let response = yield call(postMethod, req);
        yield put(actions.loginSuccess(response?.data))
     } catch (e) {
        yield put(actions.loginFailure("login error"))
     }
}

function* RegistrationActon(data){
   try {
        let req = {
            url:'login-api/register/',
            data:data?.data || {}
        }
        let response = yield call(postMethod, req);
        yield put(actions.registerationSuccess(response?.data))
     } catch (e) {
        yield put(actions.registerationFailure("registration error"))
     }
}


export function* loginWatchers() {
    yield takeEvery(LOGIN, loginActon);
    yield takeEvery(REGISTERATION, RegistrationActon);
}