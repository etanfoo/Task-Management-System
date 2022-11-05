import { ITask } from "../interfaces/api-response";
import { ITasktDetails } from "../interfaces/task";
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
  profileAssignee: -1,
  project: EmptyProjectView,
};

export const MockTasks: ITask[] = [
  {
    id: 1,
    title: "Complete report",
    deadline: "25/12/2024",
    status: 0,
    points: 5,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse  faucibus mi ac bibendum malesuada. Curabitur bibendum enim at finibus  feugiat. Aliquam erat volutpat. Cras maximus velit sed eros feugiat  dictum. Phasellus urna tellus, ultricies ac pharetra ut, lobortis in  orci. Curabitur scelerisque mi at lorem condimentum dapibus. Fusce  dapibus lacus quis mauris maximus commodo ut eget nibh. Nulla eu ex  scelerisque, imperdiet ligula ac, viverra diam. Etiam sagittis facilisis  gravida. Vestibulum ultricies eu turpis et vulputate. Mauris sed est  nec nibh congue interdum. Donec at tristique sem, id efficitur neque.  Sed libero risus, placerat sit amet malesuada in, feugiat eu elit. Fusce  quis leo ut felis tincidunt semper nec ac tellus. Etiam vehicula felis  sit amet orci consectetur, a egestas nisi porttitor. Curabitur at eros  pulvinar, bibendum mi id, maximus lorem.",
    profileAssignee: 1,
    project: EmptyProjectView,
  },
  {
    id: 2,
    title: "Finish this ticket",
    deadline: "25/12/2024",
    status: 0,
    points: 5,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse  faucibus mi ac bibendum malesuada. Curabitur bibendum enim at finibus  feugiat. Aliquam erat volutpat. Cras maximus velit sed eros feugiat  dictum. Phasellus urna tellus, ultricies ac pharetra ut, lobortis in  orci. Curabitur scelerisque mi at lorem condimentum dapibus. Fusce  dapibus lacus quis mauris maximus commodo ut eget nibh. Nulla eu ex  scelerisque, imperdiet ligula ac, viverra diam. Etiam sagittis facilisis  gravida. Vestibulum ultricies eu turpis et vulputate. Mauris sed est  nec nibh congue interdum. Donec at tristique sem, id efficitur neque.  Sed libero risus, placerat sit amet malesuada in, feugiat eu elit. Fusce  quis leo ut felis tincidunt semper nec ac tellus. Etiam vehicula felis  sit amet orci consectetur, a egestas nisi porttitor. Curabitur at eros  pulvinar, bibendum mi id, maximus lorem.",
    profileAssignee: 1,
    project: EmptyProjectView,
  },
  // {
  //   taskId: "2",
  //   title: "Complete profile page",
  //   deadline: "10/10/2022",
  //   status: "Blocked"
  // },
  // {
  //   taskId: "3",
  //   title: "Prep demo",
  //   deadline: "10/10/2022",
  //   status: "In Progress"
  // },
  // {
  //   taskId: "4",
  //   title: "Write up retro",
  //   deadline: "25/12/2024",
  //   status: "Not Started"
  // },
  // {
  //   taskId: "5",
  //   title: "Do some tasks",
  //   deadline: "1/1/2023",
  //   status: "Not Started"
  // },
];