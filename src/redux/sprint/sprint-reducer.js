import * as actionTypes from "./sprint-types";

const INITIAL_STATE = { sprintObj: {} };
const sprintReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case actionTypes.SET_SPRINT_DATA: {
        return { ...state, sprintObj: action.payload.sprintObj  };
      }
      default:
        return state;
    }
};

export default sprintReducer;