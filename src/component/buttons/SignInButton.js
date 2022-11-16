import React from "react";
import "./signInButton.css"
import { useNavigate } from "react-router-dom";

const SignInButton=()=>{

    const navigate=useNavigate();
    const navigateSignin=()=>{
        navigate('/signin')
    }
    
    return(
        <button className="signin--button" onClick={navigateSignin}>
            Sign In 
        </button>
    )
}
export default SignInButton