import axios from "axios";
import { HappinessValue } from "../components/HappinessTracker/HappinessTracker";
import { IProfile } from "../interfaces/api-response";

export const getProfile = async (profileId: number): Promise<IProfile> => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/profile/${profileId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(process.env.REACT_APP_TOKEN!)}`
      }
    });
    return data;
  } catch (err: any) {
    throw err;
  }
};

export const putProfile = async (
  profileId: number,
  name: string,
  profilePicture: string,
  aboutMe: string,
) => {
  try {
    await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/profile/${profileId}`, {
      name,
      profilePicture,
      aboutMe
    }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(process.env.REACT_APP_TOKEN!)}`
      }
    });
  } catch (err: any) {
    throw err;
  }
};

export const putProfileHappiness = async (
  profileId: number,
  happiness: HappinessValue
) => {
  try {
    await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/profile/${profileId}`, {
      happiness
    }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(process.env.REACT_APP_TOKEN!)}`
      }
    });
  } catch (err: any) {
    throw err;
  }
};

export const getProfiles = async () => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/profile`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(process.env.REACT_APP_TOKEN!)}`
      }
    });
    return data;
  } catch (err: any) {
    throw err;
  }
};
