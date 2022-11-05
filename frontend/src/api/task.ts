import axios from "axios";
import { ITask } from "../interfaces/api-response";
import { ITasktDetails } from "../interfaces/task";

// Change from ITask to =>
export const postTask = async (task: ITasktDetails, projectId: string, profileId: number, profileAssignee: number | null): Promise<ITask> => {
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/project/${projectId}/task`, {
      profileAssignee,
      profileId,
      task,
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

export const putTask = async (profileId: number): Promise<any> => {
  try {
    const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/project/${profileId}/task/${profileId}`, {
      profileId
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

export const getTasks = async (profileId: number): Promise<ITask[]> => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/profile/${profileId}/associatedTasks`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(process.env.REACT_APP_TOKEN!)}`
      }
    });
    return data;
  } catch (err: any) {
    throw err;
  }
};