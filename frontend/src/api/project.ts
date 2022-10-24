import axios from "axios";
import { IProject } from "../interfaces/api-response";

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
