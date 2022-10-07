import axios from "axios";
import { ProfileDetails } from "../interfaces/api-response";
export const getProfile = async (profileId: number): Promise<ProfileDetails> => {
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