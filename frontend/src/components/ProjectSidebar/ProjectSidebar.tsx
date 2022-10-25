
import { ProjectSidebarContainer, ProjectButton, ButtonBorder } from "./style";
import MyProjectIcon from "../../assets/folder.png";
import TaskIcon from "../../assets/task_list.png";
import CreateIcon from "../../assets/create_task.png";
import StatsIcon from "../../assets/stats.png";
import HappinessTracker from "../HappinessTracker/HappinessTracker";

type projectidProps = {
  id: string;
}

const ProjectSidebar = ({ id }: projectidProps) => {
  // const project = "project";
  return(
    <ProjectSidebarContainer>
      <ProjectButton to="/dashboard" state={{ initialPageState: "projects" }}>
        <img src={MyProjectIcon} alt='My project' />
        <h2>My Project</h2>
      </ProjectButton> 
      <ButtonBorder />
      <ProjectButton to="/dashboard" state={{ initialPageState: "tasks" }}>
        <img src={TaskIcon} alt='My tasks' />
        <h2>My Tasks</h2>
      </ProjectButton>
      <ButtonBorder />
      <ProjectButton to="/dashboard">
        <img src={CreateIcon} alt='Create task' />
        <h2>Create Task</h2>
      </ProjectButton>
      <ButtonBorder />
      <ProjectButton to={`/project/${id}/statistics`}>
        <img src={StatsIcon} alt='View stats' />
        <h2>View Stats</h2>
      </ProjectButton>
      <ButtonBorder />

      <HappinessTracker />
    </ProjectSidebarContainer>
  );
}

export default ProjectSidebar;