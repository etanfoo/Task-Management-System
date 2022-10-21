import axios from "axios";

export const acceptConnection = async (userId: number, requestorId: number) => {
  try {
    await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/profile/accept/${userId}/${requestorId}`, {
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
    await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/profile/reject/${userId}/${requestorId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(process.env.REACT_APP_TOKEN!)}`
      }
    });
  } catch (err: any) {
    throw err;
  }
};