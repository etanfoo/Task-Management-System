import axios from "axios";
import { ITask } from "../interfaces/api-response";
import { ITaskDetails } from "../interfaces/task";

export const postTask = async (task: ITaskDetails, projectId: number, profileId: number, profileAssignee: number | null): Promise<ITask> => {
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
  };
};

export const putTask = async (projectId: number, taskId: number, task: ITaskDetails, profileAssignee: number, profileId: number): Promise<ITask> => {
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
  };
};

export const getUserTasks = async (profileId: number): Promise<ITask[]> => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/profile/${profileId}/assignedTasks`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(process.env.REACT_APP_TOKEN!)}`
      }
    });
    return data;
  } catch (err: any) {
    throw err;
  };
};

export const getTask = async (projectId: number, taskId: number): Promise<ITask> => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/project/${projectId}/task/${taskId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(process.env.REACT_APP_TOKEN!)}`
      }
    });
    return data;
  } catch (err: any) {
    throw err;
  };
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
  };
};

export const deleteTask = async (taskId: number, projectId: number, profileId: number): Promise<string> => {
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
  };
};