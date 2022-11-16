import axios from "axios";

 export const signinServer = (obj) => {
    let response = axios.post("https://sprintvoteapi.herokuapp.com/user/login", obj);
    return response;
  
  };



 export const signupServer = (obj) => {
  let response = axios.post("https://sprintvoteapi.herokuapp.com/user/register", obj);
  return response;
};

