import { IProjectDetails } from "../interfaces/project";

export const EmptyProject: IProjectDetails = {
  title: "",
  description: "",
  id: 0
};


export const MockProjects = [
  {
    title: "Red Lions",
    description: "Is best 3900 team.",
    id: 0
  },
  {
    title: "A really really long project name.",
    description: "Test test 123 123.",
    id: 1
  },
  {
    title: "Test123 abc",
    description: "A really really really really really really really really really really really really really really really long description.",
    id: 2
  },
];