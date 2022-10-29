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
  assignedTasks: ITask[];
  authoredTasks: ITask[];
};

export interface IProject {
  description: string;
  id: number;
  profiles: IProfile[];
  tasks: ITask[];
  title: string;
};

export interface ITask {
  // todo
};