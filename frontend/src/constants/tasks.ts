import { ITask } from "../interfaces/api-response";
import { ITasktDetails, TaskStatus } from "../interfaces/task";
import { EmptyProfile } from "./profiles";
import { EmptyProjectView } from "./projects";

export const EmptyTaskEdit: ITasktDetails = {
  title: "",
  description: "",
  points: 1,
  status: 0,
  deadline: "",
};

export const EmptyTaskView: ITask = {
  title: "",
  description: "",
  points: 1,
  status: 0,
  deadline: "",
  id: -1,
  profileAssignee: EmptyProfile,
  profileAuthor: EmptyProfile,
  project: EmptyProjectView,
};

export const taskStatus: TaskStatus = {
  0: "Not Started",
  1: "In Progress",
  2: "Completed",
  3: "Blocked",
};
