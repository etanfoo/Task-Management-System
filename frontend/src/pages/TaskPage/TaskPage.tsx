import { InputLabel, MenuItem, Select, SelectChangeEvent, Slider, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTask, putTask } from "../../api/task";
import Footer from "../../components/Footer/Footer";
import FriendsList from "../../components/FriendsList/FriendsList";
import Header from "../../components/Header/Header";
import { EmptyTaskEdit, EmptyTaskView } from "../../constants/tasks";
import { formatDate, getInitials } from "../../helpers";
import { IProfile, ITask } from "../../interfaces/api-response";
// import { ITask } from "../../interfaces/api-response";
import { ITasktDetails } from "../../interfaces/task";
import { BodyContainer, CancelButton, DeadlineContainer, DescriptionContainer, IconContainerEdit, IconContainerView, MainContainer, StyledAvatar, StyledSelect, StyledSlider, TaskContainer, TaskMembers, TaskPageContainer, TitleContainerEdit, TitleContainerView, TopContainer, UpdateButton, UserAvatar, UserAvatarEdit, UserCard } from "./style"
import EditIcon from "../../assets/edit.png";
import DeleteIcon from "../../assets/delete.png";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";
import { EmptyProfile } from "../../constants/profiles";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DeleteOverlay from "../../components/DeleteOverlay/DeleteOverlay";

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
  const [isDelete, setIsDelete] = useState<boolean>(false); 

  // CHange to deadline?
  const [value, setValue] = useState<Dayjs | null>(null);

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
    if (newValue !== null) setUpdatedTaskDetails({ ...updatedTaskDetails, deadline: newValue.format('YYYY-MM-DD') });
  };

  const loadTask = async () => {
    // console.log(projectId, taskId);
    try {
      const resp = await getTask(parseInt(projectId!), parseInt(taskId!));
      console.log(resp)
      setTaskDetails(resp);
      setPossibleAssignees(resp.project.profiles);
      setSelectedMember(resp.profileAssignee);
      setUpdatedTaskDetails({ ...updatedTaskDetails, points: resp.points})
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
    setUpdatedTaskDetails(EmptyTaskEdit);
  }
  // Display project as well

  const updateTask = async () => {
    try {
      await putTask(parseInt(projectId!), parseInt(taskId!), updatedTaskDetails, selectedMember.id);
      window.location.reload();
    } catch (err: any) {
      console.log(err);
    }
  }

  return(
    <>
    {
      isLoading 
      ? <LoadingOverlay isOpen={isLoading}/>
      :
      <TaskPageContainer>
      <DeleteOverlay isOpen={isDelete} content="task" contentId={taskId!} closeCallback={() => setIsDelete(false)} memberId={null} secondaryContentId={parseInt(projectId!)}/>
      <Header />
      <BodyContainer>
        <FriendsList />
        <MainContainer>
          <TaskContainer>
            {pageState === 'view'
              ? 
                <>
                  <TitleContainerView>
                    <h1>{taskDetails.title} [{taskDetails.points}]</h1>
                    {
                        isMember
                      ?
                        <IconContainerView>
                          <>
                            <img src={EditIcon} alt='edit icon' onClick={() => setPageState('edit')}/>
                            <img src={DeleteIcon} alt='delete icon' onClick={() => setIsDelete(true)}/>
                          </>
                        </IconContainerView>
                      :
                        null
                    }
                  </TitleContainerView>
                  <h3>Deadline: {taskDetails.deadline ? formatDate(taskDetails.deadline) : "No current deadline"}</h3>
                </>
              :
                <TopContainer>
                  <TitleContainerEdit>
                    <TextField 
                      placeholder={taskDetails.title}
                      sx={{ width: "40%" }}
                      onChange={(e) => setUpdatedTaskDetails({ ...updatedTaskDetails, title: e.target.value})}
                    />
                    <h3>Points:</h3>
                    {/* Value not saving */}
                    <StyledSlider
                      defaultValue={updatedTaskDetails.points}
                      valueLabelDisplay="auto"
                      step={1}
                      marks
                      min={1}
                      max={10}
                      sx={{ width: "25%" }}
                      value={updatedTaskDetails.points}
                      onChange={(e, val) => setUpdatedTaskDetails({ ...updatedTaskDetails, points: val as number})}
                    />
                    <IconContainerEdit>
                      <CancelButton variant='contained' onClick={cancelEditTask} >Cancel</CancelButton>
                      <UpdateButton variant='contained' onClick={updateTask}>Update</UpdateButton>
                    </IconContainerEdit>
                  </TitleContainerEdit>
                  <DeadlineContainer>
                    <h3>Deadline:</h3>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        inputFormat="DD/MM/YYYY"
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} sx={{ width: "17%" }}/>}
                      />
                    </LocalizationProvider>
                  </DeadlineContainer>
                </TopContainer>
            }
            
            {/* Look at project */}
            
            {/* <StyledForm> */}
              {/* <InputLabel>Task Status</InputLabel> */}
            <Select
              // label="Your tasks"
              value={taskDetails.status.toString()}
              // Have own useState? maybe one for edit (view uses useEffect?)
              onChange={(e: SelectChangeEvent) => setTaskDetails({...taskDetails, status: parseInt(e.target.value)})}
              sx={{ width: "16.06vw" }}
              style={{ height: 50 }}
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
                  <StyledSelect
                    defaultValue="1"
                    value={selectedMember.id < 1 ? "" : selectedMember.id.toString()}
                    // MAKE NEW FUNCITNO??
                    // onChange={(e: SelectChangeEvent) => findSelectMember(parseInt(e.target.value))}
                    sx={{ width: "30%" }}
                    // size='small'
                  >
                    {possibleAssignees.map((user)=> (
                      <MenuItem value={user.id} key={user.id}>
                        <UserCard>
                          {!!user.profilePicture
                            ? (
                              <UserAvatarEdit src={user.profilePicture} alt='assignee avatar' />
                            ) : (
                              <StyledAvatar>
                                {getInitials(user.name)}
                              </StyledAvatar>
                            )
                          }
                          <h3>{user.name}</h3>
                        </UserCard>
                      </MenuItem>
                    ))}
                  </StyledSelect>
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
                    onChange={(e) => setUpdatedTaskDetails({ ...updatedTaskDetails, description: e.target.value})}
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