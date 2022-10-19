import { useEffect, useState } from "react";
import { Divider, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { BodyContainer, StyledForm, DashboardPageContainer, LabelContainer, LeftContainer, OverflowContainer, RightContainer, TasksContainer, StyledTextField, SelectContainer, ImageContainer, FriendsContainer, LabelContainer2 } from "./style";
import { MockFriends } from "../../constants/profiles";
import { MockTasks } from "../../constants/tasks";
import { MockProjects } from "../../constants/projects";
import TaskCard from "../../components/TaskCard/TaskCard";
import FriendsCard from "../../components/FriendsCard/FriendsCard";
import SadIcon from "../../assets/sad.png";
import HappyIcon from "../../assets/happy.png";
import NeutralIcon from "../../assets/neutral.png";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

type DashboardPageProps = {
  initialPageState: "tasks" | "projects";
};

const DashboardPage = ({ initialPageState }: DashboardPageProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [pageState, setPageState] = useState<string>(initialPageState);

  const [taskSortType, setTaskSortType] = useState<string>("");
  const [projectSortType, setProjectSortType] = useState<string>("");

  const [projects, setProjects] = useState(MockProjects);
  const [tasks, setTasks] = useState(MockTasks);

  useEffect(() => {
    if (pageState === "tasks") {
      let sortedTasks: any[] = tasks;
      if (taskSortType === "ID") {
        sortedTasks = [...tasks].sort(
          (taskA, taskB) => taskA.taskId.localeCompare(taskB.taskId)
        );
      } else if (taskSortType === "Title") {
        sortedTasks = [...tasks].sort(
          (taskA, taskB) => taskA.title.localeCompare(taskB.title)
        );        
      } else if (taskSortType === "Status") {
        sortedTasks = [...tasks].sort(
          (taskA, taskB) => taskA.status.localeCompare(taskB.status)
        );
      } else if (taskSortType === "Deadline") {
        sortedTasks = [...tasks].sort(
          // todo: figure out how deadline is store - date or string?
          (taskA, taskB) => taskA.deadline.localeCompare(taskB.deadline)
        );
      }
      setTasks(sortedTasks);
    } else {
      let sortedProjects: any[] = projects;
      if (projectSortType === "Name") {
        sortedProjects = [...projects].sort(
          (projectA, projectB) => projectA.name.localeCompare(projectB.name)
        );
      } else if (projectSortType === "Description") {
        sortedProjects = [...projects].sort(
          (projectA, projectB) => projectA.description.localeCompare(projectB.description)
        );        
      }
      setProjects(sortedProjects);
    }
    // eslint-disable-next-line
  }, [taskSortType, projectSortType]);

  return (
    <DashboardPageContainer>
      <Header />
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
          {/* if user has not inputted show otherwise show nothing */}
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
            label="Search for a task"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SelectContainer>
            <StyledForm>
              <InputLabel>Your stuff</InputLabel>
              <Select
                defaultValue="Your tasks"
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
                <LabelContainer>
                  <p>ID</p>
                  <p>Title</p>
                  <p>Deadline</p>
                  <p>Status</p>
                </LabelContainer>
              ): (
                <LabelContainer2>
                  <p>Name</p>
                  <p>Description</p>                  
                </LabelContainer2>
              )
            }
            <OverflowContainer>
              {pageState === "tasks"
                ? (
                  tasks.map((task) => (
                    <TaskCard
                      key={task.taskId}
                      taskId={task.taskId}
                      title={task.title}
                      deadline={task.deadline}
                      status={task.status}
                    />
                  ))
                ) : (
                  projects.map((project) => (
                    <ProjectCard
                      key={project.name}
                      name={project.name}
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