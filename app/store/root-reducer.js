import { combineReducers } from "redux";
import Login from "./../component/login/reducer";

const rootReducer = combineReducers({
    login: Login
});
export default rootReducer;