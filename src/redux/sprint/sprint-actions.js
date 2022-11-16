import * as actionTypes from "./sprint-types"
export const setSprintData = (sprintObj) => {
    return {
      type: actionTypes.SET_SPRINT_DATA,
      payload:{
          sprintObj:sprintObj,
      },
    };
  };