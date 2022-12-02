import { loginWatchers } from "./../component/login/saga";
import { all } from 'redux-saga/effects';
import { checkSessionWatchers } from "../component/routing/saga";

export default function* rootWatchers() {
    yield all([
        loginWatchers(),
        checkSessionWatchers()
    ]);
}