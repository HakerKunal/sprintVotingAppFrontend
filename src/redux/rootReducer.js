import { combineReducers } from "redux";
import sprintReducer from "./sprint/sprint-reducer";
import userReducer from "./user/user-reducer";

const rootReducer = combineReducers({
    user:userReducer,
    sprint:sprintReducer
  });
  export default rootReducer;