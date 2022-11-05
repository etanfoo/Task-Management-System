import { InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTask } from "../../api/task";
import Footer from "../../components/Footer/Footer";
import FriendsList from "../../components/FriendsList/FriendsList";
import Header from "../../components/Header/Header";
import { EmptyTaskEdit, EmptyTaskView, MockTasks } from "../../constants/tasks";
import { ITask } from "../../interfaces/api-response";
import { BodyContainer, MainContainer, TaskPageContainer } from "./style";

// const taskStatus = {
//   0: "Not Started",
//   1: "In Progress",
//   2: "Completed",
//   3: "Blocked"
// }

const TaskPage = () => {
  const { projectId, taskId } = useParams();
  // const { taskId } = useParams();
  console.log(projectId, taskId)
  const [taskOne, setTaskOne] = useState<ITask>(EmptyTaskView);

  const loadTask = async () => {
    try {
      const resp = await getTask(parseInt(projectId!), parseInt(taskId!));
      console.log(resp)
      setTaskOne(resp)
    } catch (err: any) {
      console.log(err)
    }
  }

  useEffect(() => {
    loadTask();
  }, [])

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
              <MenuItem value={0}>Not Started</MenuItem>
              <MenuItem value={1}>In Progress</MenuItem>
              <MenuItem value={2}>Completed</MenuItem>
              <MenuItem value={3}>Blocked</MenuItem>
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