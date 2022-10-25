import { IProfile } from "./api-response";

export interface IProjectDetails {
  title: string;
  description: string;
  id: number;
  profiles: IProfile[];
};