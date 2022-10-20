import { useEffect, useState } from "react";
import { Divider, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { BodyContainer, StyledForm, DashboardPageContainer, TasksLabelContainer, LeftContainer, OverflowContainer, RightContainer, TasksContainer, StyledTextField, SelectContainer, ImageContainer, FriendsContainer, ProjectsLabelContainer } from "./style";
import { MockFriends } from "../../constants/profiles";
import { MockTasks } from "../../constants/tasks";
import TaskCard from "../../components/TaskCard/TaskCard";
import FriendsCard from "../../components/FriendsCard/FriendsCard";
import SadIcon from "../../assets/sad.png";
import HappyIcon from "../../assets/happy.png";
import NeutralIcon from "../../assets/neutral.png";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { Palette } from "../../components/Palette";
import { getProjects } from "../../api/project";
import { IProject } from "../../interfaces/api-response";
import ConnectionRequestsModal from "./ConnectionRequestsModal/ConnectionRequestsModal";

type DashboardPageProps = {
  initialPageState: "tasks" | "projects";
};

const DashboardPage = ({ initialPageState }: DashboardPageProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [pageState, setPageState] = useState<string>(initialPageState);

  const [taskSortType, setTaskSortType] = useState<string>("ID");
  const [projectSortType, setProjectSortType] = useState<string>("Name");

  const [allProjects, setAllProjects] = useState<IProject[]>([]);
  const [allTasks, setAllTasks] = useState(MockTasks);

  const [shownProjects, setShownProjects] = useState(allProjects);
  const [shownTasks, setShownTasks] = useState(allTasks);

  const [isConnectionRequestsModalVisible, setIsConnectionRequestsModalVisible] = useState<boolean>(false);

  const fetchAllProjects = async () => {
    try {
      const data = await getProjects(parseInt(sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!));
      setAllProjects(data);
    } catch (err: any) {
      // todo: figure some error handling here? show error popup?
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllProjects();
  }, []);

  useEffect(() => {
    if (pageState === "tasks") {
      let sortedTasks: any[] = shownTasks;
      if (taskSortType === "ID") {
        sortedTasks = [...shownTasks].sort(
          (taskA, taskB) => taskA.taskId.localeCompare(taskB.taskId)
        );
      } else if (taskSortType === "Title") {
        sortedTasks = [...shownTasks].sort(
          (taskA, taskB) => taskA.title.localeCompare(taskB.title)
        );        
      } else if (taskSortType === "Status") {
        sortedTasks = [...shownTasks].sort(
          (taskA, taskB) => taskA.status.localeCompare(taskB.status)
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
        handleClose={() => setIsConnectionRequestsModalVisible(false)}
      />
      <Header 
        triggerConnectionRequestsModal={() => setIsConnectionRequestsModalVisible(true)}
      />
      <BodyContainer>
        <LeftContainer>
          <h2>Your friends</h2>
          <FriendsContainer>
            {MockFriends.map((friend) => (
              <FriendsCard
                key={friend.profileId}
                profileId={friend.profileId}
                name={friend.name}
                email={friend.email}
                imageURL={friend.imageURL}
              />
            ))}
          </FriendsContainer>
          {/* todo: if user has not inputted show otherwise show nothing */}
          <Divider/>
          <h2>How are you feeling this week?</h2>
          <ImageContainer>
            <img alt='sad icon' src={SadIcon} />
            <img alt='emotionless icon' src={NeutralIcon} />
            <img alt='happy icon' src={HappyIcon} />
          </ImageContainer>
        </LeftContainer>
        <RightContainer>
          <StyledTextField
            fullWidth
            label="Search for a task..."
            onChange={(e) => setSearchQuery(e.target.value)}
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
                    <MenuItem value={"Status"}>Status</MenuItem>
                    <MenuItem value={"Deadline"}>Deadline</MenuItem>
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
                <TasksLabelContainer>
                  <p style={{ color: taskSortType === "ID" ? "black" : Palette.thGray }}>ID</p>
                  <p style={{ color: taskSortType === "Title" ? "black" : Palette.thGray }}>Title</p>
                  <p style={{ color: taskSortType === "Deadline" ? "black" : Palette.thGray }}>Deadline</p>
                  <p style={{ color: taskSortType === "Status" ? "black" : Palette.thGray }}>Status</p>
                </TasksLabelContainer>
              ): (
                <ProjectsLabelContainer>
                  <p style={{ color: projectSortType === "Name" ? "black" : Palette.thGray }}>Name</p>
                  <p style={{ color: projectSortType === "Description" ? "black" : Palette.thGray }}>Description</p>                  
                </ProjectsLabelContainer>
              )
            }
            <OverflowContainer>
              {pageState === "tasks"
                ? (
                  shownTasks.map((task) => (
                    <TaskCard
                      key={task.taskId}
                      taskId={task.taskId}
                      title={task.title}
                      deadline={task.deadline}
                      status={task.status}
                    />
                  ))
                ) : (
                  shownProjects.map((project) => (
                    <ProjectCard
                      key={project.title}
                      projectId={1}
                      name={project.title}
                      description={project.description}
                    />
                  ))
                )
              }
            </OverflowContainer>
          </TasksContainer>
        </RightContainer>
      </BodyContainer>
      <Footer />
    </DashboardPageContainer>
  );
}

export default DashboardPage;