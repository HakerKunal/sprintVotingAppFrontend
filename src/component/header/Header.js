import React from "react";
import LogOutButton from "../buttons/LogOutButton";
import SignInButton from "../buttons/SignInButton";
import SignUpButton from "../buttons/SingUpButton";
import "./header.css";
import {connect} from "react-redux"

const Header = ({loginStatus}) => {

  return (
    
    <header>
      <h1 >Sprint Voting App</h1>

        {loginStatus ? (
             <div className="header--buttons">
          <LogOutButton />
          </div>
        ) : (
          <div className="header--buttons">
            <SignInButton />
            <SignUpButton />
          </div>
        )}
   
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
   
    loginStatus: state.user.Login_status,
  };
};

export default connect(mapStateToProps)(Header);
