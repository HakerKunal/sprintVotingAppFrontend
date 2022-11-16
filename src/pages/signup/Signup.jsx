import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../component/header/Header";
import { signupServer } from "../../services/auth_services";
import "./signup.css";

const Signup = () => {
  const [signUpObj, setSignUpObj] = useState({
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
  });
  const [usernameErr, setusernameErr] = useState({});
  const [passwordErr, setPasswordErr] = useState({});
  const [emailErr, setEmailErr] = useState({});
  const [firstNameErr, setFirstNameErr] = useState({});
  const [lastNameErr, setLastNameErr] = useState({});
  const [invalidUsername, setinValidUsername] = useState(false);
  const formValidation = () => {
    const usernameErr = {};
    const passwordErr = {};
    const firstNameErr = {};
    const lastNameErr = {};
    const emailErr = {};

    let isValid = true;

    if (signUpObj.username.trim().length < 4) {
      usernameErr.usernameLength = "Username is  too short";
      isValid = false;
    }
    if (signUpObj.password.trim().length < 8) {
      passwordErr.passwordLength = "Password should be 8 Character in Length";
      isValid = false;
    }
    if (signUpObj.first_name.trim() === "") {
      firstNameErr.firstnameLength = "First Name should not be Empty";
      isValid = false;
    }
    if (signUpObj.last_name.trim() === "") {
      lastNameErr.lastnameLength = "Last Name should not be Empty";
      isValid = false;
    }
    if (signUpObj.email.trim() === "") {
      emailErr.emailLength = "Email should not be Empty";
      isValid = false;
    }
    setusernameErr(usernameErr);
    setPasswordErr(passwordErr);
    setFirstNameErr(firstNameErr);
    setLastNameErr(lastNameErr);
    setEmailErr(emailErr);
    return isValid;
  };

  const navigate = useNavigate();
  const handleSignUp = () => {
    const isValid = formValidation();
    if (isValid) {
      signupServer(signUpObj)
        .then((res) => {
          alert("User Registration Successfull");
          navigate("/signin");
        })
        .catch((err) => {
          if (err.request.status === 400) {
            setinValidUsername(true);
          } else {
            console.log(err);
          }
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="form">
        <h2 className="form--heading">Sign Up</h2>

        <div className="form--username">
          <label>username</label>
          <input
            type="text"
            placeholder="username"
            onChange={(e) =>
              setSignUpObj({ ...signUpObj, username: e.target.value })
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
              setSignUpObj({ ...signUpObj, password: e.target.value })
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
        <div className="form--username">
          <label>Email</label>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) =>
              setSignUpObj({ ...signUpObj, email: e.target.value })
            }
          />
        </div>
        {Object.keys(emailErr).map((key) => {
          return (
            <div style={{ color: "red" }} className="signin--err--text">
              {emailErr[key]}
            </div>
          );
        })}
        <div className="form--username">
          <label>First Name</label>
          <input
            type="text"
            placeholder="First Name"
            onChange={(e) =>
              setSignUpObj({ ...signUpObj, first_name: e.target.value })
            }
          />
        </div>
        {Object.keys(firstNameErr).map((key) => {
          return (
            <div style={{ color: "red" }} className="signin--err--text">
              {firstNameErr[key]}
            </div>
          );
        })}
        <div className="form--username">
          <label>Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            onChange={(e) =>
              setSignUpObj({ ...signUpObj, last_name: e.target.value })
            }
          />
        </div>
        {Object.keys(lastNameErr).map((key) => {
          return (
            <div style={{ color: "red" }} className="signin--err--text">
              {lastNameErr[key]}
            </div>
          );
        })}
        {invalidUsername ? (
          <div style={{ color: "red" }} className="signin--err--text--invalid">
            Username Already Exist!!
          </div>
        ) : null}
        <div className="form--buttons">
          <button className="form--button" onClick={handleSignUp}>
            Sign-Up
          </button>
        </div>
        <p className="form--link--text">
          {" "}
          Already Have Account !! Sign-In Now.. <a href="/signin">SignIn</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
