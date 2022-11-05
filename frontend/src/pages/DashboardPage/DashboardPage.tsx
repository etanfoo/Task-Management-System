import { useEffect, useState } from "react";
import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { BodyContainer, StyledForm, DashboardPageContainer, TasksLabelContainer, OverflowContainer, RightContainer, TasksContainer, StyledTextField, SelectContainer, ProjectsLabelContainer } from "./style";
import { MockTasks } from "../../constants/tasks";
import TaskCard from "../../components/TaskCard/TaskCard";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { Palette } from "../../components/Palette";
import { getProjects } from "../../api/project";
import { IProject, ITask } from "../../interfaces/api-response";
import ConnectionRequestsModal from "./ConnectionRequestsModal/ConnectionRequestsModal";
import { useLocation } from "react-router-dom";
import FriendsList from "../../components/FriendsList/FriendsList";
import CreateTaskModal from "../../components/CreateTaskModal/CreateTaskModal";
// import { userTasks } from "../../helpers";
import { getTasks } from "../../api/task";

const DashboardPage = () => {
  const location = useLocation();
  const { initialPageState } = location.state;

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [pageState, setPageState] = useState<string>(initialPageState);

  const [taskSortType, setTaskSortType] = useState<string>("ID");
  const [projectSortType, setProjectSortType] = useState<string>("Name");

  const [allProjects, setAllProjects] = useState<IProject[]>([]);

  // todo: currently disabling until tasks epic is complete

  const [allTasks, setAllTasks] = useState<ITask[]>([]);

  const [shownProjects, setShownProjects] = useState<IProject[]>([]);
  const [shownTasks, setShownTasks] = useState<ITask[]>([]);

  const [isConnectionRequestsModalVisible, setIsConnectionRequestsModalVisible] = useState<boolean>(false);

  const [isCreateTaskModalVisible, setIsCreateTaskModalVisible] = useState<boolean>(false);

  const fetchAllProjects = async () => {
    try {
      const data = await getProjects(parseInt(sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!));
      setAllProjects(data);
      setShownProjects(data);
    } catch (err: any) {
      // todo: figure some error handling here? show error popup?
      console.log(err);
    }
  };

  const fetchAllTasks = async () => {
    // const a = ;
    // setAllTasks(userTasks(parseInt(sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!)));
    try {
      const resp = await getTasks(parseInt(sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!));
      console.log(resp)
      setAllTasks(resp);
      setShownTasks(resp);
    } catch (err:any) { 
      console.log(err);
    }
  }

  useEffect(() => {
    fetchAllTasks();
    fetchAllProjects();
  }, []);

  useEffect(() => {
    if (pageState === "tasks") {
      let sortedTasks: ITask[] = shownTasks;
      if (taskSortType === "ID") {
        sortedTasks = [...shownTasks].sort(
          (taskA, taskB) => taskA.id.toString().localeCompare(taskB.id.toString())
        );
      } else if (taskSortType === "Title") {
        sortedTasks = [...shownTasks].sort(
          (taskA, taskB) => taskA.title.localeCompare(taskB.title)
        );        
      } else if (taskSortType === "Status") {
        sortedTasks = [...shownTasks].sort(
          (taskA, taskB) => taskA.status.toString().localeCompare(taskB.status.toString())
        );
      } else if (taskSortType === "Deadline") {
        sortedTasks = [...shownTasks].sort(
          // todo: figure out how deadline is store - date or string?
          (taskA, taskB) => taskA.deadline.localeCompare(taskB.deadline)
        );
      }
      setShownTasks(sortedTasks);
    } else {
      let sortedProjects: any[] = shownProjects;
      if (projectSortType === "Name") {
        sortedProjects = [...shownProjects].sort(
          (projectA, projectB) => projectA.title.localeCompare(projectB.title)
        );
      } else if (projectSortType === "Description") {
        sortedProjects = [...shownProjects].sort(
          (projectA, projectB) => projectA.description.localeCompare(projectB.description)
        );        
      }
      setShownProjects(sortedProjects);
    }
    // eslint-disable-next-line
  }, [taskSortType, projectSortType]);

  useEffect(() => {
    if (pageState === "tasks") {
      setShownTasks(allTasks.filter((task) => 
        task.title.toLowerCase().includes(searchQuery)
      ));
      setTaskSortType("ID");
    } else {
      setShownProjects(allProjects.filter((project) => 
        project.title.toLowerCase().includes(searchQuery)
      ));
      setProjectSortType("Name");
    }
    // eslint-disable-next-line
  }, [searchQuery]);

  return (
    <DashboardPageContainer>
      <ConnectionRequestsModal
        isOpen={isConnectionRequestsModalVisible}
        // todo: temp fix, need to refresh friends list after adding someone
        handleClose={() => {setIsConnectionRequestsModalVisible(false); window.location.reload();}}
      />
      <CreateTaskModal 
        isOpen={isCreateTaskModalVisible}
        handleClose={() => {setIsCreateTaskModalVisible(false)}}
        projectId={null}
      />
      <Header 
        triggerConnectionRequestsModal={() => setIsConnectionRequestsModalVisible(true)}
        // todo: include trigger create task modal
        triggerCreateTaskModal={() => setIsCreateTaskModalVisible(true)}
      />
      <BodyContainer>
        <FriendsList />
        <RightContainer>
          <StyledTextField
            fullWidth
            label={`Search for a ${pageState === "tasks" ? "task..." : "project..."}`}
            onChange={(e) => setSearchQuery(e.target.value.toLocaleLowerCase())}
          />
          <SelectContainer>
            <StyledForm>
              <InputLabel>Your stuff</InputLabel>
              <Select
                label="Your tasks"
                value={pageState}
                onChange={(e: SelectChangeEvent) => setPageState(e.target.value)}
              >
                <MenuItem value={"tasks"}>Your tasks</MenuItem>
                <MenuItem value={"projects"}>Your projects</MenuItem>
              </Select>
            </StyledForm>
            <StyledForm>
              <InputLabel>Sort by</InputLabel>
              {pageState === "tasks"
                ? (
                  <Select
                    label="Sort by"
                    value={taskSortType}
                    onChange={(e: SelectChangeEvent) => setTaskSortType(e.target.value)}
                  >
                    <MenuItem value={"ID"}>ID</MenuItem>
                    <MenuItem value={"Title"}>Title</MenuItem>
                    <MenuItem value={"Deadline"}>Deadline</MenuItem>
                    <MenuItem value={"Status"}>Status</MenuItem>
                  </Select>
                ): (
                  <Select
                    label="Sort by"
                    value={projectSortType}
                    onChange={(e: SelectChangeEvent) => setProjectSortType(e.target.value)}
                  >
                    <MenuItem value={"Name"}>Name</MenuItem>
                    <MenuItem value={"Description"}>Description</MenuItem>
                  </Select>
                )
              }
            </StyledForm>
          </SelectContainer>
          <TasksContainer>
            {pageState === "tasks"
              ? (
                shownTasks.length === 0
                ? (
                  <p>Nothing to see here...</p>
                ) : (
                  <>
                    <TasksLabelContainer>
                      <p style={{ color: taskSortType === "ID" ? "black" : Palette.thGray }}>ID</p>
                      <p style={{ color: taskSortType === "Title" ? "black" : Palette.thGray }}>Title</p>
                      <p style={{ color: taskSortType === "Deadline" ? "black" : Palette.thGray }}>Deadline</p>
                      <p style={{ color: taskSortType === "Status" ? "black" : Palette.thGray }}>Status</p>
                    </TasksLabelContainer>
                    <OverflowContainer>
                      {shownTasks.map((task) => (
                        <TaskCard
                          key={`task ${task.id}`}
                          projectId={task.project.id}
                          taskId={task.id}
                          title={task.title}
                          deadline={task.deadline}
                          status={task.status}
                        />
                      ))}
                    </OverflowContainer>
                  </>
                )
              ): (
                shownProjects.length === 0
                ? (
                  <p>Nothing to see here</p>
                ) : (
                  <>
                    <ProjectsLabelContainer>
                      <p style={{ color: projectSortType === "Name" ? "black" : Palette.thGray }}>Name</p>
                      <p style={{ color: projectSortType === "Description" ? "black" : Palette.thGray }}>Description</p>                  
                    </ProjectsLabelContainer>
                    <OverflowContainer>
                      {shownProjects.map((project) => (
                        <ProjectCard
                          key={`project ${project.id}`}
                          projectId={project.id}
                          name={project.title}
                          description={project.description}
                        />
                      ))}
                    </OverflowContainer>
                  </>
                )
              )
            }
          </TasksContainer>
        </RightContainer>
      </BodyContainer>
      <Footer />
    </DashboardPageContainer>
  );
}

export default DashboardPage;