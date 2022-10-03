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

// todo: check api route
export const postSignUp = async (name: string, email: string, password: string): Promise<string> => {
  try {
    const { data } = await axios.post<string>(`${process.env.REACT_APP_API_URL}/v1/user/signup`, {
      name,
      email,
      password
    });
    
    return data;
  } catch (err: any) {
    throw err;
  }
};