import { combineReducers } from "redux";
import checkSessionValidation from "../component/routing/reducer";
import Login from "./../component/login/reducer";
import Attendance from "./../component/attendance/reducer";

const rootReducer = combineReducers({
    login: Login,
    session:checkSessionValidation,
    attendance:Attendance
});
export default rootReducer;