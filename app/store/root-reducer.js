import { combineReducers } from "redux";
import checkSessionValidation from "../component/routing/reducer";
import Login from "./../component/login/reducer";
import Attendance from "./../component/attendance/reducer";
import Leave from "../component/leave/reducer";
import Dashboard from "../component/home/reducer";

const rootReducer = combineReducers({
    login: Login,
    session:checkSessionValidation,
    attendance:Attendance,
    leave:Leave,
    dashboard:Dashboard
});
export default rootReducer;