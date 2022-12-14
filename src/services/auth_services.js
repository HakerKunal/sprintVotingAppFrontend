import axios from "axios";

 export const signinServer = (obj) => {
    let response = axios.post("http://127.0.0.1:8000/user/login", obj);
    return response;
  
  };



 export const signupServer = (obj) => {
  let response = axios.post("http://127.0.0.1:8000/user/register", obj);
  return response;
};

