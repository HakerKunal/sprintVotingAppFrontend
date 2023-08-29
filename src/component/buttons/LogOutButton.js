import React from "react";
import "./signInButton.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/user/user-actions";
import { connect } from "react-redux";

const LogOutButton = ({ logout }) => {
  const navigate = useNavigate();
  const navigateSignin = async () => {
    navigate("/signin");
    logout();
    localStorage.removeItem("token");
  };

  return (
    <button className="signin--button" onClick={navigateSignin}>
      Logout
    </button>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};
export default connect(null, mapDispatchToProps)(LogOutButton);
