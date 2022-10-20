import axios from "axios";

export const requestConnection = async (
  profileId1: number,
  profileId2: number
) => {
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/profile/connect/${profileId1}/${profileId2}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(process.env.REACT_APP_TOKEN!)}`
      }
    });
  } catch (err: any) {
    throw err;
  }
};

