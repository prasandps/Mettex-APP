import { put, takeEvery, delay, call, takeLatest } from "redux-saga/effects";
import { getMethod, postMethod } from "../common/services";
import * as actions from "./actions";
import { CREATE_LEAVE_REQUEST, CREATE_PREMISSION_REQUEST, GET_LEAVE_PENDING, UPDATE_LEAVE_REQUEST } from "./constants";


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


function* createLeaveRequestAction(data){
  
    try {
         let req = {
             url:'leave-api/create',
             data:data?.data || {}
         }
         console.log("==== saga req", data);
         let response = yield call(postMethod, req);
         console.log("==== saga response", response);
         yield put(actions.createLeaveRequestSuccess(response?.data))
      } catch (e) {
         yield put(actions.createLeaveRequestFailure("Create leave error"))
      }
 }


function* updateLeaveRequestAction(data){
  
    try {
         let req = {
             url:`leave-api/update/?id=${data.data.id}`,
             data:data?.data || {}
         }
         let response = yield call(postMethod, req);
         yield put(actions.updateLeaveRequestSuccess(response?.data))
      } catch (e) {
         yield put(actions.updateLeaveRequestSuccess("Create leave error"))
      }
 }

 
 function* premissionReqAction(data){
  
    try {
         let req = {
             url:`leave-api/permission`,
             data:data?.data || {}
         }
         let response = yield call(postMethod, req);
         yield put(actions.premissionRequestSuccess(response?.data))
      } catch (e) {
         yield put(actions.premissionRequestFailure("Create leave error"))
      }
 }


export function* leaveWatchers() {
    yield takeLatest(GET_LEAVE_PENDING, getLeavePendingAction);
    yield takeLatest(CREATE_LEAVE_REQUEST, createLeaveRequestAction);
    yield takeLatest(UPDATE_LEAVE_REQUEST, updateLeaveRequestAction);
    yield takeLatest(CREATE_PREMISSION_REQUEST, premissionReqAction);
}