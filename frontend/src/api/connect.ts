import axios from "axios";

/*
 * non-empty data response means created a new connection request in backend
 * empty data response means a connection is already pending
*/
export const requestConnection = async (
  profileId1: number,
  profileId2: number
) => {
  try {
    const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/profile/connect/${profileId1}/${profileId2}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(process.env.REACT_APP_TOKEN!)}`
      }
    });

    return data;
  } catch (err: any) {
    throw err;
  }
};

