import { put, takeEvery, delay, call, takeLatest } from "redux-saga/effects";
import { getMethod, postMethod } from "../common/services";
import * as actions from "./actions";
import { GET_DASHBOARD_INFO } from "./constants";


function* getDashboardInfoAction(data){
   try {
        let req = {
            url:'dashboard-api/index',
            data:data?.data || {}
        }
        let response = yield call(postMethod, req);
        yield put(actions.getDashboardInfoSuccess(response?.data))
     } catch (e) {
        yield put(actions.getDashboardInfoFailure("Dashbaord error"))
     }
}

export function* dashboardWatchers() {
    yield takeLatest(GET_DASHBOARD_INFO, getDashboardInfoAction);

}