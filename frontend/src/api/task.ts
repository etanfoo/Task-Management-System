import axios from "axios";
import { ITask } from "../interfaces/api-response";
import { ITasktDetails } from "../interfaces/task";

// Change from ITask to =>
export const postTask = async (task: ITasktDetails, projectId: number, profileId: number, profileAssignee: number | null): Promise<ITask> => {
  // console.log(profileAssignee)
  // console.log(profileId)
  // console.log(task)
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/project/${projectId}/task`, {
      profileAssignee,
      profileId,
      task
    }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(process.env.REACT_APP_TOKEN!)}`
      }
    });
    return data;
  } catch (err: any) {
    throw err;
  }
};

export const putTask = async (projectId: number, taskId: number, task: ITasktDetails, profileAssignee: number, profileId: number): Promise<ITask> => {
  // console.log(task)
  try {
    const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/project/${projectId}/task/${taskId}`, {
      profileAssignee,
      profileId,
      task
    }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(process.env.REACT_APP_TOKEN!)}`
      }
    });
    return data;
  } catch (err: any) {
    throw err;
  }
}

export const getUserTasks = async (profileId: number): Promise<ITask[]> => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/profile/${profileId}/assignedTasks`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(process.env.REACT_APP_TOKEN!)}`
      }
    });
    console.log(data)
    return data;
  } catch (err: any) {
    throw err;
  }
};

export const getTask = async (projectId: number, taskId: number): Promise<ITask> => {
  // console.log(projectId, taskId)
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/project/${projectId}/task/${taskId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(process.env.REACT_APP_TOKEN!)}`
      }
    });
    return data;
  } catch (err: any) {
    throw err;
  }
};

export const getProjectTasks = async (projectId: number): Promise<ITask[]> => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/project/${projectId}/allTasks`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(process.env.REACT_APP_TOKEN!)}`
      }
    });
    return data;
  } catch (err: any) {
    throw err;
  }
};

export const deleteTask = async (taskId: number, projectId: number, profileId: number): Promise<string> => {
  console.log(taskId, projectId)
  try {
    const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/project/${projectId.toString()}/task/${taskId.toString()}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(process.env.REACT_APP_TOKEN!)}`
      }, 
      data: {
        profileId
      }
    });
    return data;
  } catch (err: any) {
    throw err;
  }
};