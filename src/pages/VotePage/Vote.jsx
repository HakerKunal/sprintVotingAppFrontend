import React, { useDebugValue, useEffect } from "react";
import { useState } from "react";
import Header from "../../component/header/Header";
import Menu from "../../component/menu/Menu";
import {
  getParameter,
  getSpecialMentionData,
  getUsersData,
  getVoteData,
  postSpecialMentionData,
  postSprintData,
  putSprintData,
} from "../../services/sprint_service";
import "./vote.css";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Typography, TextField, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Vote = ({ token, sprintId }) => {
  const [parameterList, setParameterList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [listOfVotes, setListOfVotes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isupdated, setUpdated] = useState(false);
  const [specialMention, setSpecialMention] = useState("");

  const navigate = useNavigate();

  let axiosConfig = {
    headers: {
      Authorization: token,
    },
  };

  useEffect(() => {
    getVoteData(sprintId, axiosConfig)
      .then((res) => setListOfVotes(res.data.data.vote_details))
      .then(setIsLoaded(true));
  }, [isLoaded]);
  setTimeout(() => {
    if (listOfVotes.length > 0) {
      listOfVotes.forEach((vote) => {
        const a = document.getElementById(vote.parameter_id);
        a.value = vote.vote_to;
        if (vote.vote_to == null) {
          a.value = "";
        }
      });
      setUpdated(true);
    }
  }, 10);

  const changeVote = async (event, param) => {
    const voteMap = {};

    voteMap["vote_to"] = parseInt(event.target.value);
    if (event.target.value == "") {
      voteMap.vote_to = null;
    }
    voteMap["parameter_id"] = param.id;

    if (listOfVotes.some((e) => e.parameter_id == param.id)) {
      const index = listOfVotes.findIndex(
        ({ parameter_id }) => parameter_id == param.id
      );

      listOfVotes.splice(index, 1);
      listOfVotes.push(voteMap);
    } else {
      listOfVotes.push(voteMap);
    }
  };

  useEffect(() => {
    getParameter(axiosConfig)
      .then((res) => {
        setParameterList(res.data.data);
      })
      .catch((err) => {
        alert("Something went Wrong!!");
        navigate("/signin");
      });
    getUsersData(axiosConfig)
      .then((res) => {
        setUserList(res.data.data);
      })
      .then((err) => {});
  }, [parameterList.id]);
  useEffect(() => {
    getSpecialMentionData(axiosConfig, sprintId).then((res) => {
      setSpecialMention(JSON.parse(res.data.data).special_mention);
    });
  }, [sprintId]);
  const options = userList.map((user) => {
    return { value: user.id, label: user.name };
  });
  const paramList = parameterList.map((param) => (
    <div className="vote--field">
      <label className="vote--answer">{param.parameter_name}</label>
      <select
        id={param.id}
        className="vote--select"
        onChange={(event) => changeVote(event, param)}
      >
        <option value={""}>please select a value</option>
        {options.map((user) => (
          <option value={user.value}>{user.label}</option>
        ))}
      </select>
    </div>
  ));

  const submitVotes = async () => {
    if (listOfVotes.length > 0) {
      let voteObj = { parameter_list: listOfVotes };
      if (!isupdated) {
        postSprintData(voteObj, axiosConfig, sprintId)
          .then((res) => {
            submitSpecialMention();
            alert("Voting Successful");
            navigate("/dashboard");
          })
          .catch((err) => {
            alert(JSON.stringify(err.response.data, null, 4));
            navigate("/dashboard");
          });
      } else if (isupdated) {
        putSprintData(voteObj, axiosConfig, sprintId)
          .then((res) => {
            submitSpecialMention();
            alert("Updation Successful");
            navigate("/dashboard");
          })
          .catch((err) => {
            alert(JSON.stringify(err.response.data, null, 4));

            navigate("/dashboard");
          });
      }
    }
  };

  const submitSpecialMention = () => {
    postSpecialMentionData(
      { sprint_id: sprintId, special_mentions: specialMention },
      axiosConfig
    );
  };

  return (
    <div>
      <Header />
      <Menu />

      {paramList.length > 0 ? (
        <div className="vote--form">
          <h5 className="sprint--heading">Vote</h5>

          <Box className="vote--innerform">
            <div className="vote--field">
              <label className="vote--question">Parameter</label>

              <label className="vote--answer">Vote To</label>
            </div>
            {paramList}
            <Accordion
              sx={{ width: 400, color: "black !important" }}
              color="yellow"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Special Mention</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TextField
                  maxRows={4}
                  minRows={4}
                  value={specialMention}
                  margin="none"
                  fullWidth
                  id="fullWidth"
                  multiline
                  color="success"
                  placeholder="Special Mention"
                  onChange={(event) => setSpecialMention(event.target.value)}
                />
              </AccordionDetails>
            </Accordion>
            <button onClick={submitVotes} className="vote--button">
              {isupdated ? <label>Update</label> : <label>Submit</label>}
            </button>
          </Box>
        </div>
      ) : (
        <CircularProgress
          color="inherit"
          thickness={5}
          size={60}
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    sprintId: state.sprint.sprintObj.id,
  };
};
export default connect(mapStateToProps)(Vote);
