export interface IAuthResponse {
  access_token: string;
  profile_id: number;
};

export interface IProfile {
  name: string;
  email: string;
  aboutMe: string;
  profilePicture: string;
};
