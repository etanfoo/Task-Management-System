import { IProfile } from "../interfaces/api-response";
import { IUpdatedProfileDetails } from "../interfaces/profile";

export const EmptyProfile: IProfile = {
  id: -1,
  name: "First Last",
  email: "",
  points: -1,
  happiness: -1,
  profilePicture: "",
  busyness: -1,
  aboutMe: "",
  assignedTasks: [],
  authoredTasks: [],
};

export const EmptyUpdatedProfileDetails: IUpdatedProfileDetails = {
  name: "",
  aboutMe: "",
  profilePicture: "",
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