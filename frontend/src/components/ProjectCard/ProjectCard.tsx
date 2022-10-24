import { useNavigate } from "react-router-dom";
import { ProjectCardContainer } from "./style";

type ProjectCardProps = {
  projectId: number;
  name: string;
  description: string;
};

const ProjectCard = ({ name, description, projectId }: ProjectCardProps) => {
  const navigate = useNavigate();
  
  return (
    <ProjectCardContainer onClick={() => navigate(`/project/${projectId}`)}>
      <p>{name}</p>
      <p>{description}</p>
    </ProjectCardContainer>
  )
};

export default ProjectCard;