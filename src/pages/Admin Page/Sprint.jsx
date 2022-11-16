import React from "react";
import { useState } from "react";
import {
  putSprintData,
  putSprintDetailData,
} from "../../services/sprint_service";
import "./sprint.css";
import { connect } from "react-redux";

const Sprint = ({ sprintObj, token }) => {
  const [sprintDetails, setSprintDetails] = useState({
    id: sprintObj.id,
    sprint_name: sprintObj.sprint_name,
    start_date: sprintObj.start_date,
    end_date: sprintObj.end_date,
    is_active: sprintObj.is_active,
    show_result: sprintObj.show_result,
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  let axiosConfig = {
    headers: {
      Authorization: token,
    },
  };

  const changeIsActive = () => {
    setError("");
    setMessage("");
    setSprintDetails((prevstate) => {
      return { ...prevstate, is_active: !sprintDetails.is_active };
    });
  };
  const changeSprintName = (e) => {
    setError("");
    setMessage("");
    setSprintDetails({
      ...sprintDetails,
      sprint_name: e.target.value,
    });
  };
  const changeStartDate = (e) => {
    setError("");
    setMessage("");
    setSprintDetails({
      ...sprintDetails,
      start_date: e.target.value,
    });
  };
  const changeEndDate = (e) => {
    setError("");
    setMessage("");
    setSprintDetails({
      ...sprintDetails,
      end_date: e.target.value,
    });
  };

  const changeShowResult = () => {
    setError("");
    setMessage("");
    setSprintDetails((prevState) => {
      return { ...prevState, show_result: !sprintDetails.show_result };
    });
  };
  const handleUpdate = () => {
    let putData = {
      is_active: sprintDetails.is_active,
      show_result: sprintDetails.show_result,
      sprint_name: sprintDetails.sprint_name,
      start_date: sprintDetails.start_date,
      end_date: sprintDetails.end_date,
    };

    putSprintDetailData(putData, axiosConfig, sprintDetails.id)
      .then((res) => {
        setError("");
        alert("Sprint Updated");
      })
      .catch((err) => {
        if (err.response.status) {
          setMessage("");
          setError(err.response.data.error);
        }
      });
  };

  return (
    <div className="sprint--box">
      <input
        type="text"
        style={{ position: "relative", right: "10px", width: "250px" }}
        value={sprintDetails.sprint_name}
        onChange={changeSprintName}
      ></input>
      <input
        type="text"
        style={{ position: "relative", right: "25px" }}
        value={sprintDetails.start_date}
        onChange={changeStartDate}
      ></input>
      <input
        type="text"
        style={{ position: "relative", right: "40px" }}
        value={sprintDetails.end_date}
        onChange={changeEndDate}
      ></input>
      <input
        type="checkbox"
        checked={sprintDetails.is_active}
        onChange={changeIsActive}
        style={{ position: "relative", right: "40px" }}
      />
      <input
        type="checkbox"
        checked={sprintDetails.show_result}
        onChange={changeShowResult}
        style={{ position: "relative", right: "5px" }}
      />

      <button
        style={{ position: "relative", left: "15x" }}
        onClick={handleUpdate}
      >
        Update
      </button>
      <p style={{ position: "absolute", top: "10px", color: "red" }}>{error}</p>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    token: state.user.token,
  };
};
export default connect(mapStateToProps)(Sprint);
