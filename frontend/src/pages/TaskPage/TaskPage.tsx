import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTask } from "../../api/task";
import Footer from "../../components/Footer/Footer";
import FriendsList from "../../components/FriendsList/FriendsList";
import Header from "../../components/Header/Header";
import { EmptyTaskEdit, EmptyTaskView } from "../../constants/tasks";
import { getInitials } from "../../helpers";
import { ITask } from "../../interfaces/api-response";
// import { ITask } from "../../interfaces/api-response";
import { ITasktDetails } from "../../interfaces/task";
import { BodyContainer, CancelButton, DescriptionContainer, IconContainer, MainContainer, StyledAvatar, TaskContainer, TaskMembers, TaskPageContainer, UpdateButton, UserAvatar } from "./style"
import EditIcon from "../../assets/edit.png";
import DeleteIcon from "../../assets/delete.png";

const TaskPage = () => {
  const { projectId, taskId } = useParams();
  // const { taskId } = useParams();
  // console.log(projectId, taskId)
  const [taskDetails, setTaskDetails] = useState<ITask>(EmptyTaskView);
  // Make sure empty fields can be detected (for user that didnt input)
  const [updatedTaskDetails, setUpdatedTaskDetails] = useState<ITasktDetails>(EmptyTaskEdit);
  const [isMember, setIsMember] = useState<boolean>(false);

  const loadTask = async () => {
    try {
      const resp = await getTask(parseInt(projectId!), parseInt(taskId!));
      console.log(resp)
      setTaskDetails(resp);
      const profileId = parseInt(sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!);
      if (resp.profileAssignee.id === profileId || resp.profileAuthor.id === profileId) setIsMember(true);
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
          <TaskContainer>
            {
                isMember
              ?
                <IconContainer>
                  <img src={EditIcon} alt='edit icon' />
                  <img src={DeleteIcon} alt='edit icon' />
                  <CancelButton variant='contained'>Cancel</CancelButton>
                  <UpdateButton variant='contained'>Update</UpdateButton>
                </IconContainer>
              :
                null
            }
            
            <h1>{taskDetails.title} [{taskDetails.points}]</h1>
            <h3>Deadline: {taskDetails.deadline}</h3>
            {/* Look at project */}
            
            {/* <StyledForm> */}
              {/* <InputLabel>Task Status</InputLabel> */}
              <Select
                // label="Your tasks"
                value={taskDetails.status.toString()}
                onChange={(e: SelectChangeEvent) => setTaskDetails({...taskDetails, status: parseInt(e.target.value)})}
                sx={{ width: "15%" }}
              >
                <MenuItem value={0}>Not Started</MenuItem>
                <MenuItem value={1}>In Progress</MenuItem>
                <MenuItem value={2}>Completed</MenuItem>
                <MenuItem value={3}>Blocked</MenuItem>
              </Select>
            <TaskMembers>
              <h3>
                <div>Author:</div>
                {!!taskDetails.profileAuthor.profilePicture
                  ? (
                    <UserAvatar src={taskDetails.profileAuthor.profilePicture} alt='author avatar' />
                  ) : (
                    <StyledAvatar>
                      {getInitials(taskDetails.profileAuthor.name)}
                    </StyledAvatar>
                  )
                }
                <div>{taskDetails.profileAuthor.name}</div>
              </h3>
              <h3>
                <div>Assignee:</div>
                {!!taskDetails.profileAssignee.profilePicture
                  ? (
                    <UserAvatar src={taskDetails.profileAssignee.profilePicture} alt='assignee avatar' />
                  ) : (
                    <StyledAvatar>
                      {getInitials(taskDetails.profileAssignee.name)}
                    </StyledAvatar>
                  )
                }
                {
                    taskDetails.profileAssignee 
                  ?
                    <div>{taskDetails.profileAssignee.name}</div>
                  :
                    <div>Unassigned</div>
                }
              </h3>
            </TaskMembers>
            <DescriptionContainer>
              <p>{taskDetails.description}</p>
            </DescriptionContainer>
          </TaskContainer>
          {/* </StyledForm> */}
        </MainContainer>
      </BodyContainer>
      <Footer />
    </TaskPageContainer>
  )
}

export default TaskPage;