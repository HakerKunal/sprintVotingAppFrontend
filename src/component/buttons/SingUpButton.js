import React from "react";
import "./signInButton.css"
import { useNavigate } from "react-router-dom";

const SignUpButton=()=>{

    const navigate=useNavigate();
    const navigateSignin=()=>{
        navigate('/signup')
    }
    
    return(
        <button className="signin--button" onClick={navigateSignin}>
            Sign Up 
        </button>
    )
}
export default SignUpButton