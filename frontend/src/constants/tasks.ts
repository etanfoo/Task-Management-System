import { ITasktDetails } from "../interfaces/task";

export const EmptyTask: ITasktDetails = {
  title: "New test",
  description: "Please work",
  points: 1, 
  status: 0,
  deadline: new Date(),
  projectId: 1,
  assignee: 1,
};

export const MockTasks = [
  {
    taskId: "1",
    title: "Complete report",
    deadline: "25/12/2024",
    status: "Completed",
    points: "5",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse  faucibus mi ac bibendum malesuada. Curabitur bibendum enim at finibus  feugiat. Aliquam erat volutpat. Cras maximus velit sed eros feugiat  dictum. Phasellus urna tellus, ultricies ac pharetra ut, lobortis in  orci. Curabitur scelerisque mi at lorem condimentum dapibus. Fusce  dapibus lacus quis mauris maximus commodo ut eget nibh. Nulla eu ex  scelerisque, imperdiet ligula ac, viverra diam. Etiam sagittis facilisis  gravida. Vestibulum ultricies eu turpis et vulputate. Mauris sed est  nec nibh congue interdum. Donec at tristique sem, id efficitur neque.  Sed libero risus, placerat sit amet malesuada in, feugiat eu elit. Fusce  quis leo ut felis tincidunt semper nec ac tellus. Etiam vehicula felis  sit amet orci consectetur, a egestas nisi porttitor. Curabitur at eros  pulvinar, bibendum mi id, maximus lorem."
  },
  {
    taskId: "2",
    title: "Complete profile page",
    deadline: "10/10/2022",
    status: "Blocked"
  },
  {
    taskId: "3",
    title: "Prep demo",
    deadline: "10/10/2022",
    status: "In Progress"
  },
  {
    taskId: "4",
    title: "Write up retro",
    deadline: "25/12/2024",
    status: "Not Started"
  },
  {
    taskId: "5",
    title: "Do some tasks",
    deadline: "1/1/2023",
    status: "Not Started"
  },
];