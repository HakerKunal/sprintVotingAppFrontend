import React from "react";

const WinnerBox = ({ resultData }) => {
  return (
    <div className="result--winner-box">
      <div className="result--winner--name">
        <label className="result--winner-text">Winner</label>
        <label className="result--winner--name--text">
          {resultData ? resultData.winner.map((x) => x + " ") : ""}
        </label>
      </div>
      <div className="result--winner--name">
        <label className="result--winner-text">First Runner Up</label>
        <label className="result--winner--name--text">
          {resultData ? resultData.first_runner_up.map((x) => x + " ") : ""}
        </label>
      </div>
      <div className="result--winner--name">
        <label className="result--winner-text">Second Runner Up</label>
        <label className="result--winner--name--text">
          {resultData ? resultData.second_runner_up.map((x) => x + " ") : ""}
        </label>
      </div>
    </div>
  );
};
export default WinnerBox;
