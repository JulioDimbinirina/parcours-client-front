import {loggerUserReducer, UserInformation} from "./loggerUserReducer";

import { combineReducers } from "redux";

export interface Reducers {
    logger: UserInformation | null;
}

const allReducers = combineReducers<Reducers>({
    logger: loggerUserReducer,
});

export default allReducers;