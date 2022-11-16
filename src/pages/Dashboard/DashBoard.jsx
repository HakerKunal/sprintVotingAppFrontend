import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../component/header/Header";
import Menu from "../../component/menu/Menu";
import { getSprintData } from "../../services/sprint_service";
import "./dashboard.css";
import { connect } from "react-redux";
import { setSprintData } from "../../redux/sprint/sprint-actions";
import CircularProgress from "@mui/material/CircularProgress";
const Dashboard = ({ token, setSprintData }) => {
  const [sprintObj, setSprintObj] = useState({
    id: "",
    sprint_name: "",
    start_date: "",
    end_date: "",
  });
  let axiosConfig = {
    headers: {
      Authorization: token,
    },
  };
  const navigate = useNavigate();
  useEffect(() => {
    getSprintData(axiosConfig)
      .then((res) => {
        setSprintObj({
          ...sprintObj,
          id: res.data.is_active[0].id,
          sprint_name: res.data.is_active[0].sprint_name,
          start_date: res.data.is_active[0].start_date,
          end_date: res.data.is_active[0].end_date,
        });
      })
      .then(setSprintData(sprintObj))

      .catch((err) => {
        // alert("Something Went Wrong");
        // navigate("/signin");
      });
  }, [sprintObj.sprint_name]);

  if (token) {
    return (
      <div>
        <Header />
        <Menu />
        {sprintObj.sprint_name ? (
          <div className="sprint--form">
            {sprintObj.sprint_name ? (
              <>
                <h5 className="sprint--heading">Active Sprint Details</h5>

                <div className="sprint--fields">
                  <label className="sprint--question">Sprint Name</label>
                  <label className="sprint--answer--name">
                    {sprintObj.sprint_name ? (
                      sprintObj.sprint_name
                    ) : (
                      <p>loading...</p>
                    )}
                  </label>
                  <label className="sprint--question">Start Date</label>
                  <label className="sprint--answer">
                    {sprintObj.start_date ? (
                      sprintObj.start_date
                    ) : (
                      <p>loading...</p>
                    )}
                  </label>
                  <label className="sprint--question">End Date</label>
                  <label className="sprint--answer">
                    {sprintObj.end_date ? (
                      sprintObj.end_date
                    ) : (
                      <p>loading...</p>
                    )}
                  </label>
                </div>
                <button
                  className="sprint--vote--button"
                  onClick={() => navigate("/vote")}
                >
                  Vote
                </button>
              </>
            ) : (
              <p
                style={{
                  position: "relative",
                  top: "40%",
                  left: "40%",
                  color: "red",
                }}
              >
                No Sprint is Active
              </p>
            )}
          </div>
        ) : (
          <CircularProgress
          color='inherit'
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
  } else if (!token) {
    setTimeout(() => {
      navigate("/signin");
    }, 100);
    return <h1>Something Went Wrong</h1>;
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    setSprintData: (sprintObj) => dispatch(setSprintData(sprintObj)),
  };
};

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
