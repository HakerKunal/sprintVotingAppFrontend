import React from "react";
import "./admin.css";
import Header from "../../component/header/Header";
import Menu from "../../component/menu/Menu";
import Sprint from "./Sprint";
import { useEffect } from "react";
import {
  deleteGameData,
  getSprintData,
  postSprintDetailData,
} from "../../services/sprint_service";
import { connect } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = ({ token }) => {
  const [listOfSprints, setListOfSprints] = useState([]);
  const [sprint, setSprint] = useState({
    sprint_name: "",
    start_date: "",
    end_date: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  let navigate = useNavigate();
  let axiosConfig = {
    headers: {
      Authorization: token,
    },
  };
  useEffect(() => {
    getSprintData(axiosConfig).then((res) => {
      setListOfSprints(res.data.data);
    });
  }, []);
  const handleClick = () => {
    if (
      (sprint.sprint_name !== "",
      sprint.end_date !== "",
      sprint.start_date !== "")
    ) {
      postSprintDetailData(sprint, axiosConfig)
        .then((res) => {
          setError("");
          setMessage("Sprint Added Successfully");
        })
        .catch((err) => {
          if (err.response.data.error) {
            setError(err.response.data.error);
          }
        });
    } else {
      setError("Every Filed is Required");
    }
  };
  if (token) {
    return (
      <div>
        <Header />
        <Menu />
        <div className="admin--form">
          <div className="admin--sprint-form">
            <h3>List Of Sprints</h3>
            <div className="admin--sprint--label">
              <div
                style={{ position: "relative", left: "70px", width: "250px" }}
              >
                Sprint Name
              </div>
              <div>Start Date</div>
              <div>End Date</div>
              <div>Active</div>
              <div>Show Result</div>
              <div>Action</div>
            </div>
            {listOfSprints &&
              listOfSprints.map((sprint) => (
                <Sprint sprintObj={sprint} key={sprint.id} />
              ))}
          </div>
          <div className="admin--sprint-form">
            <h3>Create Sprint</h3>
            <div className="admin-creat-sprint-form">
              <p>Sprint Name</p>
              <input
                type="text"
                onChange={(e) => {
                  setError("");
                  setSprint({ ...sprint, sprint_name: e.target.value });
                }}
              />
              <p>Start Date</p>
              <input
                type="date"
                onChange={(e) => {
                  setError("");
                  setSprint({ ...sprint, start_date: e.target.value });
                }}
              />
              <p>End Date</p>
              <input
                type="date"
                onChange={(e) => {
                  setError("");
                  setSprint({ ...sprint, end_date: e.target.value });
                }}
              />
              <button onClick={handleClick}>Save</button>
            </div>
            <p style={{ color: "red", fontSize: 13 }}>{error}</p>
            {message && (
              <p style={{ color: "green", fontSize: 13 }}>{message}</p>
            )}
          </div>
          <div className="admin--sprint-form">
            <h3>delete game data</h3>
            <button onClick={() => deleteGameData().then(res=>console.log(res)).catch(err=>console.log(err))} style={{ width: 200 }}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
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
  };
};

export default connect(mapStateToProps)(Admin);
