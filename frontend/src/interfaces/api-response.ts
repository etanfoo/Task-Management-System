import { HappinessValue } from "../components/HappinessTracker/HappinessTracker";

export interface IAuthResponse {
  access_token: string;
  profile_id: number;
};

export interface IProfile {
  id: number;
  name: string;
  email: string;
  points: number;
  happiness: HappinessValue;
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

// Add more fields
export interface ITask {
  id: number;
  title: string;
  description: string;
  projectId: number;
  deadline: string;
  profileAssignee: number;
  points: number;
  status: number;
};