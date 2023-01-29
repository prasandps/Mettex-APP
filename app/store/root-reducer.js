import { combineReducers } from "redux";
import checkSessionValidation from "../component/routing/reducer";
import Login from "./../component/login/reducer";
import Attendance from "./../component/attendance/reducer";
import Leave from "../component/leave/reducer";

const rootReducer = combineReducers({
    login: Login,
    session:checkSessionValidation,
    attendance:Attendance,
    leave:Leave
});
export default rootReducer;