import axios from "axios";

export const getProfile = async (profileId: number): Promise<string> => {
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