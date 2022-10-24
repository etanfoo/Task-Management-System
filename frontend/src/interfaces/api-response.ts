export interface IAuthResponse {
  access_token: string;
  profile_id: number;
};

export interface IProfile {
  id: number;
  name: string;
  email: string;
  points: number;
  happiness: number;
  profilePicture: string;
  busyness: number;
  aboutMe: string;
  projects: IProject[];
  tasks: ITask[];
  acceptedConnections: IProfile[];
  // todo: include connections
};

export interface IProject {
  id: number;
  title: string;
  description: string;
  profiles: number[];
  tasks: ITask[];
};

export interface ITask {
  // todo
};