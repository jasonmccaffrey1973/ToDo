import { fetchUpdateToDo } from "./todos_api";

export const getAPIHeader = () => {
    const apiHeader = new Headers();
    // apiHeader.append('Authorization', `Bearer ${apiToken()}`);
    apiHeader.append('Content-Type', 'application/json');
    return apiHeader;
  }
 
  export const getApiURL = () => {
    return process.env.REACT_APP_API_URL
  }

  export const getUTCDate = () => {
    const today = new Date(Date.now())
    return today.toISOString()
  }
  

  export const setTaskStatus = async (task, status)=>{
    return await fetchUpdateToDo(task.id, {...task, status: parseInt(status)})
  }

  export const updateTask = async(id, task)=>{
    return await fetchUpdateToDo(id, task)
  }
