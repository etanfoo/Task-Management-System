import { InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTask } from "../../api/task";
import Footer from "../../components/Footer/Footer";
import FriendsList from "../../components/FriendsList/FriendsList";
import Header from "../../components/Header/Header";
import { EmptyTaskEdit, EmptyTaskView } from "../../constants/tasks";
import { getInitials } from "../../helpers";
import { IProfile, ITask } from "../../interfaces/api-response";
// import { ITask } from "../../interfaces/api-response";
import { ITasktDetails } from "../../interfaces/task";
import { BodyContainer, CancelButton, DescriptionContainer, IconContainer, MainContainer, StyledAvatar, TaskContainer, TaskMembers, TaskPageContainer, UpdateButton, UserAvatar } from "./style"
import EditIcon from "../../assets/edit.png";
import DeleteIcon from "../../assets/delete.png";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";
import { UserCard } from "../../components/CreateTaskModal/style";
import { EmptyProfile } from "../../constants/profiles";

const TaskPage = () => {
  const { projectId, taskId } = useParams();
  // const { taskId } = useParams();
  // console.log(projectId, taskId)
  const [taskDetails, setTaskDetails] = useState<ITask>(EmptyTaskView);
  // Make sure empty fields can be detected (for user that didnt input)
  const [updatedTaskDetails, setUpdatedTaskDetails] = useState<ITasktDetails>(EmptyTaskEdit);
  const [isMember, setIsMember] = useState<boolean>(false);
  const [pageState, setPageState] = useState<'edit' | 'view'>('view');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [possibleAssignees, setPossibleAssignees] = useState<IProfile[]>([]);
  const [selectedMember, setSelectedMember] = useState<IProfile>(EmptyProfile);

  const loadTask = async () => {
    try {
      const resp = await getTask(parseInt(projectId!), parseInt(taskId!));
      console.log(resp)
      setTaskDetails(resp);
      setPossibleAssignees(resp.project.profiles);
      setSelectedMember(resp.profileAssignee);
      const profileId = parseInt(sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!);
      if (resp.profileAssignee.id === profileId || resp.profileAuthor.id === profileId) setIsMember(true);
      setIsLoading(false);
    } catch (err: any) {
      console.log(err);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadTask();
  }, [])

  const cancelEditTask = () => {
    setPageState("view");
  }

  return(
    <>
    {
      isLoading 
      ? <LoadingOverlay isOpen={isLoading}/>
      :
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
                  {pageState === 'view'
                    ? 
                      <>
                        <img src={EditIcon} alt='edit icon' onClick={() => setPageState('edit')}/>
                        <img src={DeleteIcon} alt='edit icon' />
                      </>
                    :
                    <>
                      <CancelButton variant='contained' onClick={cancelEditTask} >Cancel</CancelButton>
                      <UpdateButton variant='contained'>Update</UpdateButton>
                    </>
                  }
                </IconContainer>
              :
                null
            }
            {pageState === 'view'
              ? 
                <>
                  <h1>{taskDetails.title} [{taskDetails.points}]</h1>
                  <h3>Deadline: {taskDetails.deadline ? taskDetails.deadline : "No current deadline"}</h3>
                </>
              :
                <>
                  <TextField 
                    placeholder={taskDetails.title}
                  />
                  {/* Change to datepicker */}
                  <TextField 
                    placeholder={taskDetails.deadline ? taskDetails.deadline : "No current deadline"}
                  />
                </>
            }
            
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
                {pageState === 'view'
                  ? 
                  <>
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
                  </>
                  :
                  <Select
                    defaultValue="1"
                    value={selectedMember.id < 1 ? "" : selectedMember.id.toString()}
                    // onChange={(e: SelectChangeEvent) => findSelectMember(parseInt(e.target.value))}
                    sx={{ width: "30%" }}
                  >
                    {possibleAssignees.map((user)=> (
                      <MenuItem value={user.id} key={user.id}>
                        <UserCard>
                          <StyledAvatar>{getInitials(`${user.name}`)}</StyledAvatar>
                          <h3>{user.name}</h3>
                        </UserCard>
                      </MenuItem>
                    ))}
                  </Select>
                }
         
              </h3>
            </TaskMembers>
            <DescriptionContainer>
              {pageState === 'view'
                ? 
                  <p>{taskDetails.description ? taskDetails.description : "Empty description"}</p>  
                :
                  <TextField 
                    placeholder={taskDetails.description ? taskDetails.description : "Empty description"}
                    sx={{ width: "100%" }}
                    multiline
                    rows={6}
                  />
              }
            </DescriptionContainer>
          </TaskContainer>
          {/* </StyledForm> */}
        </MainContainer>
      </BodyContainer>
      <Footer />
    </TaskPageContainer>
    }
    </>
  )
}

export default TaskPage;