import { IProfile } from "../interfaces/api-response";
import { IUpdatedProfileDetails } from "../interfaces/profile";

export const EmptyProfile: IProfile = {
  id: -1,
  name: "First Last",
  email: "",
  points: -1,
  happiness: null,
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
