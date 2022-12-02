import { combineReducers } from "redux";
import checkSessionValidation from "../component/routing/reducer";
import Login from "./../component/login/reducer";

const rootReducer = combineReducers({
    login: Login,
    session:checkSessionValidation
});
export default rootReducer;