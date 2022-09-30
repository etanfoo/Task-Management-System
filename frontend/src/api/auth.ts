import axios from "axios";

export const postLogin = async (email: string, password: string): Promise<string> => {
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/v1/user/login`, {
      email,
      password
    });
    
    return data;
  } catch (err: any) {
    throw err;
  }
};