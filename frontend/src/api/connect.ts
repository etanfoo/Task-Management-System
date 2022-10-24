import axios from "axios";
import { IProfile } from "../interfaces/api-response";

/*
 * non-empty data response means created a new connection request in backend
 * empty data response means a connection is already pending
 */
export const requestConnection = async (
  requestorId: number,
  userId: number
) => {
  try {
    const data = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/profile/connect/${requestorId}/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem(
            process.env.REACT_APP_TOKEN!
          )}`,
        },
      }
    );

    return data;
  } catch (err: any) {
    throw err;
  }
};

export const acceptConnection = async (userId: number, requestorId: number) => {
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/profile/accept/${userId}/${requestorId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(process.env.REACT_APP_TOKEN!)}`
      }
    });
  } catch (err: any) {
    throw err;
  }
};

export const rejectConnection = async (userId: number, requestorId: number) => {
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/profile/reject/${userId}/${requestorId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(process.env.REACT_APP_TOKEN!)}`
      }
    });
  } catch (err: any) {
    throw err;
  }
};

export const getRequestedConnections = async (userId: number): Promise<IProfile[]> => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/profile/${userId}/requestedConnections`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(process.env.REACT_APP_TOKEN!)}`
      }
    });

    return data;
  } catch (err: any) {
    throw err;
  }
};

export const getConnections = async (userId: number): Promise<IProfile[]> => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/profile/${userId}/acceptedConnections`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(process.env.REACT_APP_TOKEN!)}`
      }
    });

    return data;
  } catch (err: any) {
    throw err;
  }
};