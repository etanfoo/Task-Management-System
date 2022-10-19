import { ProjectCardContainer } from "./style";

type ProjectCardProps = {
  name: string;
  description: string;
};

const ProjectCard = ({ name, description }: ProjectCardProps) => {
  return (
    <ProjectCardContainer>
      <p>{name}</p>
      <p>{description}</p>
    </ProjectCardContainer>
  )
};

export default ProjectCard;