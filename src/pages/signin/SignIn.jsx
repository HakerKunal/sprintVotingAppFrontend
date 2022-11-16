import React from "react";
import { useState } from "react";
import { signinServer } from "../../services/auth_services";
import Header from "../../component/header/Header";
import { connect } from "react-redux";
import "./signin.css";
import { login, setUserDetails } from "../../redux/user/user-actions";
import { useNavigate } from "react-router-dom";

const SignIn = ({ logIn, setUserDetails }) => {
  const [userObj, setUserObj] = useState({ username: "", password: "" });
  const [usernameErr, setusernameErr] = useState({});
  const [passwordErr, setPasswordErr] = useState({});
  const [invalidCred, setInvalidCred] = useState(false);

  let navigate = useNavigate();

  const formValidation = () => {
    const usernameErr = {};
    const passwordErr = {};

    let isValid = true;

    if (userObj.username.trim().length < 4) {
      usernameErr.usernameLength = "Username is  too short";
      isValid = false;
    }
    if (userObj.password.trim().length < 8) {
      passwordErr.passwordLength = "Password should be 8 Character in Length";
      isValid = false;
    }
    setusernameErr(usernameErr);
    setPasswordErr(passwordErr);
    return isValid;
  };

  const handleSignIn = () => {
    const isValid = formValidation();
    if (isValid) {
        signinServer(userObj)
        .then((res) => {
          setUserDetails(res.data);
          logIn(res.data.token);
          navigate("/dashboard");
        })
        .catch((err) => {
          console.log(err);
          setInvalidCred(true);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="form2">
        <h2 className="form--heading">Sign In</h2>

        <div className="form--username">
          <label>username</label>

          <input
            type="text"
            placeholder="username"
            onChange={(e) =>
              setUserObj({ ...userObj, username: e.target.value })
            }
          />
        </div>
        {Object.keys(usernameErr).map((key) => {
          return (
            <div style={{ color: "red" }} className="signin--err--text">
              {usernameErr[key]}
            </div>
          );
        })}
        <div className="form--username">
          <label>password</label>

          <input
            type="password"
            placeholder="password"
            onChange={(e) =>
              setUserObj({ ...userObj, password: e.target.value })
            }
          />
        </div>
        {Object.keys(passwordErr).map((key) => {
          return (
            <div style={{ color: "red" }} className="signin--err--text">
              {passwordErr[key]}
            </div>
          );
        })}

        {invalidCred ? (
          <div style={{ color: "red" }} className="signin--err--text--invalid">
            Wrong Credentails!!
          </div>
        ) : null}
        <div className="form--buttons">
          <button className="form--button" onClick={handleSignIn}>
            Sign-In
          </button>
        </div>
        <p className="form--link--text">
          Dont Have Account!! Sign-Up Now.. <a href="/signup">SignUp</a>
        </p>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (token) => dispatch(login(token)),
    setUserDetails: (userObj) => dispatch(setUserDetails(userObj)),
  };
};

export default connect(null, mapDispatchToProps)(SignIn);
