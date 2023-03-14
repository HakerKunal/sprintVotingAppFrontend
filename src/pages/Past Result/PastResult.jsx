import React from "react";
import Header from "../../component/header/Header";
import Menu from "../../component/menu/Menu";
import "./PastResult.css";
import { connect } from "react-redux";
import { useEffect } from "react";
import CanvasJSReact from "../../assets/canvasjs.react";
import {
  getGameData,
  getResultData,
  getShowResult,
  getSpecialMentionResultData,
  getSprintData,
} from "../../services/sprint_service";
import { useState } from "react";
import VoteTable from "../../component/Table/VoteTable";
import WinnerBox from "../../component/Winner Box/WinnerBox";
import SprintDetailBox from "../../component/Sprint Detail Box/SprintDetailBox";
import ExportExcelButton from "../Result/ExportExcelButton";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const PastResult = ({ token }) => {
  const [listOfSprints, setListOfSprints] = useState([]);
  const [selectSprint, setSelectedSprint] = useState(0);
  const [resultData, setResultData] = useState();
  const [specialMention, setSpecialMention] = useState([]);

  let axiosConfig = {
    headers: {
      Authorization: token,
    },
  };

  useEffect(() => {
    getSprintData(axiosConfig)
      .then((res) => setListOfSprints(res.data.data))
      .catch((err) => console.log(err));
  }, [listOfSprints.length]);

  const sprintChangeHandler = (event) => {
    setResultData(0);
    setSelectedSprint(JSON.parse(event.target.value));
    getResultData(JSON.parse(event.target.value).id, axiosConfig).then(
      (res) => {
        setResultData(res.data);
      }
    );
    getSpecialMentionResultData(JSON.parse(event.target.value).id).then(
      (res) => {
        setSpecialMention(res.data.data);
      }
    );
  };
  const dataPoints = resultData ? resultData.vote_count : [{}];

  const options = {
    title: {
      text: "Sprint Voting Chart",
    },
    data: [
      {
        // Change type to "doughnut", "line", "splineArea", etc.
        type: "column",
        dataPoints: dataPoints,
      },
    ],
  };
  return (
    <div>
      <Header />
      <Menu />
      <div className="result--outer">
        <h3 className="result--heading">Result</h3>

        <div className="result--form">
          <div className="select-box">
            <h4 style={{ marginRight: 10 }}>Sprint Name </h4>

            <select onChange={sprintChangeHandler} className="drop-down-sprint">
              <option value={0}>Please Select One Sprint</option>
              {listOfSprints.map((sprint) => {
                if (!sprint?.is_active)
                  return (
                    <option
                      value={JSON.stringify(sprint)}
                      label={sprint.sprint_name}
                    >
                      {sprint.sprint_name}
                    </option>
                  );
              })}
            </select>
          </div>
          {selectSprint !== 0 && (
            <>
              <SprintDetailBox selectSprint={selectSprint} />

              {resultData.vote_count && (
                <div style={{ position: "relative", top: 150 }}>
                  <ExportExcelButton
                    sprintObj={selectSprint}
                    resultData={resultData}
                  />
                </div>
              )}
              <div className="result--graph--area">
                <CanvasJSChart
                  options={options}
                  /* onRef={ref => this.chart = ref} */
                />
              </div>
              <WinnerBox resultData={resultData} />
              <VoteTable
                resultData={resultData}
                specialMention={specialMention}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    sprintId: state.sprint.sprintObj.id,
  };
};

export default connect(mapStateToProps)(PastResult);
