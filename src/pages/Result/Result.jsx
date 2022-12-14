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
import { withStyles } from "@material-ui/core/styles";
import { useState } from "react";
import CanvasJSReact from "../../assets/canvasjs.react";
import { useNavigate } from "react-router-dom";
import Game from "./Game";
import CircularProgress from "@mui/material/CircularProgress";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VoteTable from "../../component/Table/VoteTable";
import WinnerBox from "../../component/Winner Box/WinnerBox";
import SprintDetailBox from "../../component/Sprint Detail Box/SprintDetailBox";
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
  const [gameData, setGameData] = useState([]);
  const [specialMention, setSpecialMention] = useState([]);

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
      getSpecialMentionResultData(sprintObj.id)
        .then((res) => {
          setSpecialMention(res.data.data);
        })
        .catch((err) => console.log(err));
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

  let listOfVoteBy = [];

  if (token) {
    if (sprintObj.show_result) {
      return (
        <div>
          <Header />
          <Menu />
          {resultData ? (
            <div>
              {" "}
              <h3 className="result--heading">Result</h3>
              <div className="result--form">
                {sprintObj.sprint_name ? (
                  <>
                    <SprintDetailBox selectSprint={sprintObj} />
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
                ) : (
                  <p>No Sprint is Active</p>
                )}
              </div>
            </div>
          ) : (
            <CircularProgress
              color="inherit"
              thickness={5}
              size={60}
              sx={{
                position: "absolute",
                left: "50%",
                top: "40%",
                transform: "translate(-50%, -50%)",
              }}
            />
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
            <CircularProgress
              color="inherit"
              thickness={5}
              size={60}
              sx={{
                position: "absolute",
                left: "50%",
                top: "40%",
                transform: "translate(-50%, -50%)",
              }}
            />
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
