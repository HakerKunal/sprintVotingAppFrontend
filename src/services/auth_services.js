import axios from "axios";

 export const signinServer = (obj) => {
    let response = axios.post("https://sprint-backend.vercel.app/user/login", obj);
    return response;
  
  };



 export const signupServer = (obj) => {
  let response = axios.post("https://sprint-backend.vercel.app/user/register", obj);
  return response;
};

