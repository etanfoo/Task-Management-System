import { IProjectDetails } from "../interfaces/project";

export const EmptyProject: IProjectDetails = {
  title: "",
  description: "",
  id: 0,
  profiles: []
};


export const MockProjects = [
  {
    title: "Red Lions",
    description: "Is best 3900 team.",
    id: 0,
    profiles: []
  },
  {
    title: "A really really long project name.",
    description: "Test test 123 123.",
    id: 1,
    profiles: []
  },
  {
    title: "Test123 abc",
    description: "A really really really really really really really really really really really really really really really long description.",
    id: 2,
    profiles: []
  },
];