import axios from "axios";
import { LoginResponse } from  "../interfaces/api-response";

export const postLogin = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/profile/login`, {
      email,
      password
    });
    
    return data;
  } catch (err: any) {
    throw err;
  }
};

// todo: check fields
export const postSignUp = async (name: string, email: string, password: string): Promise<string> => {
  try {
    const { data } = await axios.post<string>(`${process.env.REACT_APP_API_URL}/api/v1/profile/signup`, {
      name,
      email,
      password
    });
    console.log(data)
    return data;
  } catch (err: any) {
    throw err;
  }
};
