import * as actionTypes from "./user-types";

export const login = (token) => {
  return {
    type: actionTypes.LOG_IN,
    payload:{
        token:token,
    },
  };
};
export const logout = () => {
  return {
    type: actionTypes.LOG_OUT,
  };
};
// export const setToken = (token) => {
//   return {
//     type: actionTypes.SET_TOKEN,
//     payload: {
//       token: token,
//     },
//   };
// };
export const setUserDetails = (userObj) => {
  return {
    type: actionTypes.SET_USER_DETAILS,
    payload: {
      userObj: userObj,
    },
  };
};