import axios from "axios";
import { IAuthResponse } from  "../interfaces/api-response";

export const postLogin = async (email: string, password: string): Promise<IAuthResponse> => {
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/profile/login`, {
      email,
      password
    });
    
    return data;
  } catch (err: any) {
    throw err;
  };
};

export const postSignUp = async (name: string, email: string, password: string): Promise<IAuthResponse> => {
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/profile/signup`, {
      name,
      email,
      password
    });
    return data;
  } catch (err: any) {
    throw err;
  };
};
