
import { ProjectSidebarContainer, ProjectSidebarLinks, ButtonBorder } from "./style";
import MyProjectIcon from "../../../assets/folder.png";
import TaskIcon from "../../../assets/task_list.png";
import CreateIcon from "../../../assets/create_task.png";
import StatsIcon from "../../../assets/stats.png";
import HappinessTracker from "../../../components/HappinessTracker/HappinessTracker";

type projectIdProps = {
  id: string;
  triggerCreateTaskModal?: () => void;
}

const ProjectSidebar = ({ id, triggerCreateTaskModal }: projectIdProps) => {
  return(
    <ProjectSidebarContainer>
      <ProjectSidebarLinks to="/dashboard" state={{ initialPageState: "projects" }}>
        <img src={MyProjectIcon} alt='My project' />
        <h2>My Project</h2>
      </ProjectSidebarLinks> 
      <ButtonBorder />
      <ProjectSidebarLinks to="/dashboard" state={{ initialPageState: "tasks" }}>
        <img src={TaskIcon} alt='My tasks' />
        <h2>My Tasks</h2>
      </ProjectSidebarLinks>
      <ButtonBorder />
      <div onClick={triggerCreateTaskModal}>
        <ProjectSidebarLinks to="#">
          <img src={CreateIcon} alt='Create task'/>
          <h2>Create Task</h2>
        </ProjectSidebarLinks>
      </div>
      <ButtonBorder />
      <ProjectSidebarLinks to={`/project/${id}/statistics`}>
        <img src={StatsIcon} alt='View stats' />
        <h2>View Stats</h2>
      </ProjectSidebarLinks>
      <ButtonBorder />
      <HappinessTracker />
    </ProjectSidebarContainer>
  );
}

export default ProjectSidebar;