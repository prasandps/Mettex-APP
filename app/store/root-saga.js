import { loginWatchers } from "./../component/login/saga";
import { all } from 'redux-saga/effects';
import { checkSessionWatchers } from "../component/routing/saga";
import { attendanceWatchers } from "../component/attendance/saga";
import { leaveWatchers } from "../component/leave/saga";
import { dashboardWatchers } from "../component/home/saga";

export default function* rootWatchers() {
    yield all([
        loginWatchers(),
        checkSessionWatchers(),
        attendanceWatchers(),
        leaveWatchers(),
        dashboardWatchers()
    ]);
}