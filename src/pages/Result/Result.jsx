import React from "react";
import Header from "../../component/header/Header";
import Menu from "../../component/menu/Menu";
import "./result.css";
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
import { Typography, TextField, Paper, Box, Grid } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DarkerDisabledTextField = withStyles({
  root: {
    marginRight: 8,
    "& .MuiInputBase-root.Mui-disabled": {
      color: "#ffffff !important", // (default alpha is 0.38)
    },
  },
})(TextField);

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
        .then((res) => setSpecialMention(res.data.data))
        .catch((err) => console.log(err));
  }, [sprintObj.id]);

  useEffect(() => {
    setTimeout(() => {
      getGameData(sprintObj.id, axiosConfig).then((res) => {
        setGameData(res.data.data);
      });
    }, 1000);

    const interval = setInterval(() => {
      !sprintObj.show_result &&
        getGameData(sprintObj.id, axiosConfig).then((res) => {
          setGameData(res.data.data);
        });
    }, 3000);

    return () => clearInterval(interval);
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
                    {" "}
                    <label className="result--sprint--detail--title">
                      Sprint Detail
                    </label>
                    <div className="result--sprint--detail">
                      <div>
                        <label className="result--question">Sprint Name</label>
                        <label className="result--question">Start Date </label>
                        <label className="result--question">End Date </label>
                      </div>
                      <div>
                        <label className="result--answer">
                          {sprintObj.sprint_name ? (
                            sprintObj.sprint_name
                          ) : (
                            <h7>loading...</h7>
                          )}
                        </label>
                        <label className="result--answer">
                          {sprintObj.start_date ? (
                            sprintObj.start_date
                          ) : (
                            <h7>loading...</h7>
                          )}
                        </label>
                        <label className="result--answer">
                          {sprintObj.end_date ? (
                            sprintObj.end_date
                          ) : (
                            <h7>loading...</h7>
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="result--graph--area">
                      <CanvasJSChart
                        options={options}
                        /* onRef={ref => this.chart = ref} */
                      />
                    </div>
                    <div className="result--winner--name">
                      <label className="result--winner-text">Winner</label>
                      <label className="result--winner--name--text">
                        {resultData
                          ? resultData.winner.charAt(0).toUpperCase() +
                            resultData.winner.slice(1)
                          : ""}
                      </label>
                    </div>
                    <div className="result--winner--name">
                      <label className="result--winner-text">
                        First Runner Up
                      </label>
                      <label className="result--winner--name--text">
                        {resultData
                          ? resultData.first_runner_up.charAt(0).toUpperCase() +
                            resultData.first_runner_up.slice(1)
                          : ""}
                      </label>
                    </div>
                    <div className="result--winner--name">
                      <label className="result--winner-text">
                        Second Runner Up
                      </label>
                      <label className="result--winner--name--text">
                        {resultData
                          ? resultData.second_runner_up
                              .charAt(0)
                              .toUpperCase() +
                            resultData.second_runner_up.slice(1)
                          : ""}
                      </label>
                    </div>
                    <label className="result--vote--details--title">
                      Vote Details
                    </label>
                    <table>
                      <tr>
                        <th>S.No.</th>
                        <th>Vote By</th>
                        <th>Vote To</th>
                        <th>Parameter</th>
                      </tr>
                      {resultData ? (
                        resultData.vote_details
                          .sort((a, b) => a.vote_by.localeCompare(b.vote_by))
                          .map((val, key) => {
                            let changed = true;
                            let changed2 = false;
                            if (!listOfVoteBy.includes(val.vote_by)) {
                              listOfVoteBy.push(val.vote_by);
                              if (listOfVoteBy.length > 1) {
                                changed = false;
                                changed2 = false;
                              }
                            } else {
                              listOfVoteBy.push(val.vote_by);
                              changed = true;
                              changed2 = true;
                            }

                            return (
                              <>
                                {changed ? (
                                  <></>
                                ) : (
                                  <>
                                    <div
                                      class="blank_row"
                                      style={{ bottom: 1 }}
                                    ></div>
                                  </>
                                )}
                                {changed2 ? (
                                  <></>
                                ) : (
                                  specialMention.map((mention) => {
                                    if (val.vote_by === mention.vote_by) {
                                      return (
                                        <Accordion
                                          className="accordian_row"
                                          fullWidth
                                        >
                                          <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                          >
                                            <Typography>
                                              Special Mention
                                            </Typography>
                                          </AccordionSummary>
                                          <AccordionDetails>
                                            <span
                                              style={{
                                                border:
                                                  "1px solid rgba(0,0,0,0.25)",
                                                padding: "20px 10px ",
                                                borderRadius: 7,
                                                display: "block",
                                                whiteSpace: "pre",
                                              }}
                                            >
                                              {mention.special_mentions}
                                            </span>
                                          </AccordionDetails>
                                        </Accordion>
                                      );
                                    }
                                  })
                                )}
                                <tr key={key}>
                                  <td>{key + 1}</td>
                                  <td>{val.vote_by}</td>
                                  <td>{val.vote_to}</td>
                                  <td>{val.parameter_name}</td>
                                </tr>
                              </>
                            );
                          })
                      ) : (
                        <p>Not Voted Till Now</p>
                      )}
                    </table>
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
              <p
                class="marqueeStyle"
                style={{
                  position: "relative",
                  top: "100px",
                  left:"38%",

                  color: "red",
                }}
              >
                {error}
              </p>

              <h3 className="result--heading">Game</h3>

              <div className="result--form">
                <Game sprint={sprintObj} />
                <div className="game--dashboard">
                  <h4>Scoreboard</h4>
                  <div className="game--dashboard--headings">
                    <p>Position</p>
                    <p>Name</p>
                    <p>Moves</p>
                  </div>
                  {gameData &&
                    gameData
                      .filter((f) => f.score > 0)
                      .sort(function (a, b) {
                        return a.score - b.score;
                      })
                      .map((entry, key) => (
                        <div className="game--dashboard-entries">
                          <p style={{ width: 20, textAlign: "center" }}>
                            {key + 1}
                          </p>
                          <p style={{ width: 100, textAlign: "center" }}>
                            {entry.username}
                          </p>
                          <p style={{ width: 20, textAlign: "center" }}>
                            {entry.score}
                          </p>
                        </div>
                      ))}
                </div>
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
