import React from "react";
import Header from "../../component/header/Header";
import Menu from "../../component/menu/Menu";
import "./result.scss";
import { connect } from "react-redux";
import { useEffect } from "react";
import {
  getGameData,
  getResultData,
  getShowResult,
  getSpecialMentionResultData,
  getSprintData,
} from "../../services/sprint_service";
import { useState } from "react";
import CanvasJSReact from "../../assets/canvasjs.react";
import { useNavigate } from "react-router-dom";
import Game from "./Game";
import CircularProgress from "@mui/material/CircularProgress";

import VoteTable from "../../component/Table/VoteTable";
import WinnerBox from "../../component/Winner Box/WinnerBox";
import SprintDetailBox from "../../component/Sprint Detail Box/SprintDetailBox";
import ExportExcelButton from "./ExportExcelButton";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Result = ({ token }) => {
  const [resultData, setResultData] = useState();
  const [sprintObj, setSprintObj] = useState({
    id: "",
    sprint_name: "",
    start_date: "",
    end_date: "",
    show_result: "",
  });
  const [specialMention, setSpecialMention] = useState([]);
  const [winner, setWinner] = useState(true);

  const [error, setError] = useState(
    "Either Sprint is Not Active / Result will Anounce Soon"
  );

  const navigate = useNavigate();
  let axiosConfig = {
    headers: {
      Authorization: token,
    },
  };

  useEffect(() => {
    getSprintData(axiosConfig)
      .then(
        (res) => {
          let sprintList = res.data.data;
          sprintList.forEach((sprint) => {
            if (sprint.is_active === true) {
              setSprintObj({
                ...sprintObj,
                id: sprint.id,
                sprint_name: sprint.sprint_name,
                start_date: sprint.start_date,
                end_date: sprint.end_date,
                show_result: sprint.show_result,
              });
              setError("");
              if (sprint.show_result === false) {
                setError(
                  "Either Sprint is Not Active / Result will Anounce Soon"
                );
              }
            } else if (sprint.is_active === false) {
              setError(
                "Either Sprint is Not Active / Result will Anounce Soon"
              );
            }
          });
        },
        [sprintObj.username]
      )
      .catch((err) => {
        // navigate("/signin");
        // alert("something went wrong!!!");
      });
  }, [sprintObj.id]);

  useEffect(() => {
    getResultData(sprintObj.id, axiosConfig).then((res) => {
      setResultData(res.data);
    });
  }, [sprintObj.id]);
  useEffect(() => {
    sprintObj.id &&
      getSpecialMentionResultData(sprintObj.id).then((res) => {
        setSpecialMention(res.data.data);
      });

    //
  }, [sprintObj.id]);

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

  if (token) {
    if (sprintObj.show_result) {
      return (
        <div>
          <Header />
          <Menu />
          {resultData ? (
            <div>
              <h3 className="result--heading">Result</h3>
              <div className="result--form">
                {sprintObj.sprint_name ? (
                  <>
                    <div className="result-subheader">
                      <button
                        className="subheader--button"
                        style={{ margin: "0px 30px" }}
                        onClick={() => setWinner(true)}
                      >
                        Vote Details
                      </button>
                      <button
                        className="subheader--button"
                        style={{ margin: "0px 30px" }}
                        onClick={() => setWinner(false)}
                      >
                        Winner
                      </button>
                    </div>
                    <SprintDetailBox selectSprint={sprintObj} />
                    {resultData?.vote_count && (
                      <div style={{ position: "relative", top: 150 }}>
                        <ExportExcelButton
                          sprintObj={sprintObj}
                          resultData={resultData}
                        />
                      </div>
                    )}

                    {!winner && (
                      <>
                        <div className="result--graph--area">
                          <CanvasJSChart options={options} />
                        </div>
                        <WinnerBox resultData={resultData} />
                      </>
                    )}
                    {winner && (
                      <div style={{ marginTop: "-100px" }}>
                        <VoteTable
                          resultData={resultData}
                          specialMention={specialMention}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <p>No Sprint is Active</p>
                )}
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
              }}
            >
              <h1
                style={{
                  width: "800px",
                  textAlign: "center",
                }}
              >
                LOADING
              </h1>
              <div class="progress-bar">
                <div class="progress-fill"></div>
              </div>

              <img src="" alt=""></img>
            </div>
            // <CircularProgress
            //   color="inherit"
            //   thickness={5}
            //   size={60}
            //   sx={{
            //     position: "absolute",
            //     left: "45%",
            //     top: "45%",
            //     transform: "translate(-50%, -50%)",
            //   }}
            // />
          )}
        </div>
      );
    } else if (!sprintObj.show_result) {
      return (
        <div>
          <Header />
          <Menu />
          {sprintObj.sprint_name ? (
            <div>
              <div
                id="rssBlock"
                style={{
                  position: "relative",
                  top: "100px",

                  color: "red",
                }}
              >
                <p className="cnnContents">
                  <span class="marqueeStyle">
                    &nbsp;
                    {error}
                  </span>
                </p>
              </div>

              <h3 className="result--heading">Game</h3>

              <div className="result--form">
                <Game sprint={sprintObj} />
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
              }}
            >
              <h1
                style={{
                  width: "800px",
                  textAlign: "center",
                }}
              >
                LOADING
              </h1>
              <div class="progress-bar">
                <div class="progress-fill"></div>
              </div>

              <img src="" alt=""></img>
            </div>
            // <CircularProgress
            //   color="inherit"
            //   thickness={5}
            //   size={60}
            //   sx={{
            //     position: "absolute",
            //     left: "45%",
            //     top: "45%",
            //     transform: "translate(-50%, -50%)",
            //   }}
            // />
          )}
        </div>
      );
    }
  } else if (!token) {
    setTimeout(() => {
      navigate("/signin");
    }, 100);
    return <h1>Something Went Wrong</h1>;
  }
};

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    sprintId: state.sprint.sprintObj.id,
  };
};

export default connect(mapStateToProps)(Result);
