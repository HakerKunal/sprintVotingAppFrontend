import React from "react";

const SprintDetailBox = ({ selectSprint }) => {
  return (
    <div className="result--sprint--detail">
      <div>
        <label className="result--question">Sprint Name</label>
        <label className="result--question">Start Date </label>
        <label className="result--question">End Date </label>
      </div>
      <div>
        <label className="result--answer">
          {selectSprint.sprint_name ? (
            selectSprint.sprint_name
          ) : (
            <p>loading...</p>
          )}
        </label>
        <label className="result--answer">
          {selectSprint.start_date ? (
            selectSprint.start_date
          ) : (
            <p>loading...</p>
          )}
        </label>
        <label className="result--answer">
          {selectSprint.end_date ? selectSprint.end_date : <p>loading...</p>}
        </label>
      </div>
    </div>
  );
};
export default SprintDetailBox;
