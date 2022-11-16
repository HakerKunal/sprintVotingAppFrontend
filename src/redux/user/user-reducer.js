import * as actionTypes from "./user-types";

const INITIAL_STATE = { Login_status: false, token: null ,userObj:null};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case actionTypes.LOG_IN: {
        return { ...state, Login_status: true,token: action.payload.token  };
      }
      case actionTypes.LOG_OUT: {
        return { ...state, Login_status: false, token:null };
      }
      case actionTypes.SET_USER_DETAILS: {
        return { ...state, userObj: action.payload.userObj };
      }
      default:
        return state;
    }
};
export default userReducer;