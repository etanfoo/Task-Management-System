import { IProject } from "../interfaces/api-response";
import { IProjectDetails } from "../interfaces/project";

export const EmptyProjectEdit: IProjectDetails = {
  title: "",
  description: "",
  id: 0,
  profiles: [],
};

export const EmptyProjectView: IProject = {
  title: "",
  description: "",
  id: -1,
  profiles: [],
  tasks: [],
};
