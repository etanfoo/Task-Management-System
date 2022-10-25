import axios from "axios";
import { IProject } from "../interfaces/api-response";
import { IProjectDetails } from "../interfaces/project";

export const getProjects = async (profileId: number): Promise<IProject[]> => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/project?profileId=${profileId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(process.env.REACT_APP_TOKEN!)}`
      }
    });
    return data;
  } catch (err: any) {
    throw err;
  }
};

export const postProject = async (profileId: string, project: IProjectDetails, profileIdsToAdd: number[]): Promise<IProject> => {
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/project`, {
      profileId,
      project, 
      profileIdsToAdd
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

export const getProject = async (profileId: string): Promise<IProject> => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/project/${profileId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(process.env.REACT_APP_TOKEN!)}`
      }
    });
    
    return data;
  } catch (err: any) {
    throw err;
  }
};

export const putProject = async (profileId: number, project: IProjectDetails,  profileIdsToAdd: number[]): Promise<IProject> => {
  try {
    const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/project/${project.id}`, {
      profileId,
      project, 
      profileIdsToAdd
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

export const deleteProject = async (projectId: string, profileId: string): Promise<string> => {
  try {
    const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/project/${projectId}`, {
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
