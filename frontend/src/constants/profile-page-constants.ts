import { IProfile } from "../interfaces/api-response";

export const EmptyProfile: IProfile = {
  id: -1,
  name: "First Last",
  email: "",
  points: -1,
  happiness: -1,
  profilePicture: "",
  busyness: -1,
  aboutMe: "",
  projects: [],
  tasks: [],
};

export const MockFriends = [
  {
    profileId: 1,
    name: "John Smith",
    email: "js@email.com",
    imageURL: null
  },
  {
    profileId: 2,
    name: "Etan Foo",
    email: "etanFoo@gmail.com",
    imageURL: null
  },
  {
    profileId: 3,
    name: "Terence Huang",
    email: "tHuang@yahoo.com",
    imageURL: null
  },
  {
    profileId: 4,
    name: "Amin Beigi",
    email: "AG@hotmail.com",
    imageURL: null
  },
  {
    profileId: 5,
    name: "Adrian Demirjian",
    email: "adrianD@email.com",
    imageURL: null
  },
  {
    profileId: 6,
    name: "Sunny Wang",
    email: "sunwang@email.com",
    imageURL: null
  },
];

export const MockTasks = [
  {
    taskId: "1",
    title: "Complete report",
    deadline: "25/12/2024",
    status: "Completed"
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
    status: "In progress"
  },
  {
    taskId: "4",
    title: "Write up retro",
    deadline: "25/12/2024",
    status: "Not started"
  },
  {
    taskId: "5",
    title: "Do some tasks",
    deadline: "1/1/2023",
    status: "Not started"
  },
];