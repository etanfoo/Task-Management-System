import { useState } from "react";
import { Divider, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { BodyContainer, StyledForm, DashboardPageContainer, LabelContainer, LeftContainer, OverflowContainer, RightContainer, TasksContainer, StyledTextField, SelectContainer, ImageContainer, FriendsContainer } from "./style";
import { MockFriends, MockTasks } from "../../constants/profile-page-constants";
import TaskCard from "../../components/TaskCard/TaskCard";
import FriendsCard from "../../components/FriendsCard/FriendsCard";
import SadIcon from "../../assets/sad.png";
import HappyIcon from "../../assets/happy.png";
import NeutralIcon from "../../assets/neutral.png";

type DashboardPageProps = {
  initialPageState: "tasks" | "projects";
}

const DashboardPage = ({ initialPageState }: DashboardPageProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [pageState, setPageState] = useState<string>(initialPageState);
  const [sortType, setSortType] = useState<string>("");

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
              <Select
                label="Sort by"
                value={sortType}
                onChange={(e: SelectChangeEvent) => setSortType(e.target.value)}
              >
                {pageState === "tasks"
                 ? (
                  <div>
                    <MenuItem value={"ID"}>ID</MenuItem>
                    <MenuItem value={"Name"}>Name</MenuItem>
                    <MenuItem value={"Status"}>Status</MenuItem>
                    <MenuItem value={"Deadline"}>Deadline</MenuItem>
                  </div>
                 ) : (
                  <div>
                    <MenuItem value={"Name"}>Name</MenuItem>
                    <MenuItem value={"Summary"}>Summary</MenuItem>
                  </div>
                 )
                }
              </Select>
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
                // todo: replace null with project container
              ): null
            }
            <OverflowContainer>
              {/* todo: render depending on tasks or project */}
              {MockTasks.map((task) => (
                <TaskCard
                  key={task.taskId}
                  taskId={task.taskId}
                  title={task.title}
                  deadline={task.deadline}
                  status={task.status}
                />
              ))}
            </OverflowContainer>
          </TasksContainer>
        </RightContainer>
      </BodyContainer>
      <Footer />
    </DashboardPageContainer>
  );
}

export default DashboardPage;