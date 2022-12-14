import axios from "axios";
const LOCALURL='http://127.0.0.1:8000'
const HEROKUURL='http://127.0.0.1:8000'

 export const getSprintData = (config) => {
    let response = axios.get(HEROKUURL+"/sprint/sprints", config);
    return response;
  
  };



 export const getParameter = (config) => {
    let response = axios.get(HEROKUURL+"/sprint/params", config);
    return response;
  
  };


  export const getUsersData=(config)=>{
    let response = axios.get(HEROKUURL+"/sprint/sprintdata", config);
    return response;
  
  };

  export const postSprintData=(config,obj,id)=>{
    let response = axios.post(HEROKUURL+`/sprint/sprints/${id}/votes`, config,obj);
    return response;
  
  };

  export const getVoteData=(id,config)=>{
    let response = axios.get(HEROKUURL+`/sprint/sprints/${id}/votes`, config);
    return response;
  
  };

  export const putSprintData=(config,obj,id)=>{
    let response = axios.put(HEROKUURL+`/sprint/sprints/${id}/votes`, config,obj);
    return response;
  
  };

  export const getResultData=(id,config)=>{
    let response = axios.get(HEROKUURL+`/sprint/sprints/${id}/results`, config);
    return response;
  
  };

  export const getShowResult=(config)=>{
    let response=axios.get(HEROKUURL+`/sprint/show`, config)
    return response;
  }
  export const putSprintDetailData=(config,obj,id)=>{
    let response = axios.put(HEROKUURL+`/sprint/sprints/${id}`, config,obj);
    return response;
  
  };

  export const getGameData=(id,config)=>{
    let response = axios.get(HEROKUURL+`/sprint/game/${id}`, config);
    return response;
  
  };
  export const postGameData=(config,obj)=>{
    let response = axios.post(HEROKUURL+`/sprint/game`, config,obj);
    return response;
  
  };
  export const deleteGameData=()=>{
    let response=axios.delete(HEROKUURL+'/sprint/game');
    return response;
  }

  export const postSprintDetailData=(config,obj)=>{
    let response = axios.post(HEROKUURL+`/sprint/sprints`, config,obj);
    return response;
  
  };
  export const postSpecialMentionData=(config,obj)=>{
    let response = axios.post(HEROKUURL+`/sprint/special-mention`, config,obj);
    return response;
  
  };
  export const getSpecialMentionData=(config,sprintId)=>{
    let response = axios.get(HEROKUURL+`/sprint/special-mention/${sprintId}`, config);
    return response;
  
  };
  export const getSpecialMentionResultData=(sprintId)=>{
    let response = axios.get(HEROKUURL+`/sprint/special-mention-result/${sprintId}`);
    return response;
  
  };









