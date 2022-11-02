import { InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import FriendsList from "../../components/FriendsList/FriendsList";
import Header from "../../components/Header/Header";
import { MockTasks } from "../../constants/tasks";
import { BodyContainer, MainContainer, TaskPageContainer } from "./style";

const TaskPage = () => {
  const { taskId } = useParams();
  const [taskOne, setTaskOne] = useState(MockTasks[0]);

  return(
    <TaskPageContainer>
      <Header />
      <BodyContainer>
        <FriendsList />
        <MainContainer>
          <h1>{taskOne.title} - [{taskOne.points}]</h1>
          <p>{taskOne.deadline}</p>
          {/* <StyledForm> */}
            {/* <InputLabel>Task Status</InputLabel> */}
            <Select
              // label="Your tasks"
              value={taskOne.status}
              // onChange={(e: SelectChangeEvent) => setPageState(e.target.value)}
            >
              <MenuItem value={"Not Started"}>Not Started</MenuItem>
              <MenuItem value={"In Progress"}>In Progress</MenuItem>
              <MenuItem value={"Completed"}>Completed</MenuItem>
              <MenuItem value={"Blocked"}>Blocked</MenuItem>
            </Select>
          <p>{taskOne.description}</p>
          {/* </StyledForm> */}
        </MainContainer>
      </BodyContainer>
      <Footer />
    </TaskPageContainer>
  )
}

export default TaskPage;