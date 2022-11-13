import { useNavigate } from "react-router-dom";
import { Palette } from "../Palette";
import { ProjectCardContainer } from "./style";

type ProjectCardProps = {
  projectId: number;
  name: string;
  description: string;
  isEven: boolean;
};

const ProjectCard = ({ name, description, projectId, isEven }: ProjectCardProps) => {
  const navigate = useNavigate();
  
  return (
    <ProjectCardContainer 
      onClick={() => navigate(`/project/${projectId}`)}
      style={isEven ? { backgroundColor: Palette.mainTeal, color: 'white' }: undefined}
    >
      <p>{name}</p>
      <p>{description}</p>
    </ProjectCardContainer>
  )
};

export default ProjectCard;