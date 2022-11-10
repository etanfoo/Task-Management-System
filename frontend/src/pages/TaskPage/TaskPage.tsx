import { InputLabel, MenuItem, Select, SelectChangeEvent, Slider, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTask, putTask } from "../../api/task";
import Footer from "../../components/Footer/Footer";
import FriendsList from "../../components/FriendsList/FriendsList";
import Header from "../../components/Header/Header";
import { EmptyTaskEdit, EmptyTaskView, taskStatus } from "../../constants/tasks";
import { fetchStatusColor, findSelectedMember, formatDate, getInitials } from "../../helpers";
import { IProfile, ITask } from "../../interfaces/api-response";
// import { ITask } from "../../interfaces/api-response";
import { ITasktDetails, TaskStatus } from "../../interfaces/task";
import { BodyContainer, CancelButton, DeadlineContainer, DescriptionContainer, IconContainerEdit, IconContainerView, MainContainer, StyledAvatar, StyledSlider, TaskContainer, TaskMembers, TaskPageContainer, TitleContainerEdit, TitleContainerView, TopContainer, UpdateButton, UserAvatar, UserAvatarEdit, UserCard } from "./style"
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
      setUpdatedTaskDetails({ ...updatedTaskDetails, status: resp.status})

      const profileId = parseInt(sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!);
      if (resp.profileAuthor.id === profileId || resp.profileAssignee.id === profileId) setIsMember(true);
      setIsLoading(false);
    } catch (err: any) {
      console.log(err);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadTask();
    // eslint-disable-next-line
  }, [taskId])

  const cancelEditTask = () => {
    setPageState("view");
    setUpdatedTaskDetails(EmptyTaskEdit);
  }

  const updateTask = async () => {
    // console.log(updatedTaskDetails)
    // setUpdatedTaskDetails({ ...updatedTaskDetails, status: status})
    // console.log(selectedMember)

    // Check if all fields are empty (might be wrong)
    if (updatedTaskDetails.title === "" && updatedTaskDetails.deadline === "" && updatedTaskDetails.status === taskDetails.status && updatedTaskDetails.points === taskDetails.points && (selectedMember === null || taskDetails.profileAssignee  === null || selectedMember.id === taskDetails.profileAssignee.id) && updatedTaskDetails.description === "") {
      setPageState("view");
      return;
    } 

    // Check if user provided new inputs, if not replace with previous task details
    updatedTaskDetails.title = (!!updatedTaskDetails.title ? updatedTaskDetails.title : taskDetails.title);
    updatedTaskDetails.deadline = (!!updatedTaskDetails.deadline ? updatedTaskDetails.deadline : taskDetails.deadline);
    updatedTaskDetails.description = (!!updatedTaskDetails.description ? updatedTaskDetails.description : taskDetails.description);
    updatedTaskDetails.points = (updatedTaskDetails.points !== -1 ? updatedTaskDetails.points : taskDetails.points);
    updatedTaskDetails.status = (updatedTaskDetails.status !== taskDetails.status ? updatedTaskDetails.status : taskDetails.status);
    

    try {
      // No previous assignee and no member was selected to be assignee (might be wrong)
      if (selectedMember.id === -1 && taskDetails.profileAssignee === null) await putTask(parseInt(projectId!), parseInt(taskId!), updatedTaskDetails, null, parseInt(sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!));
      else await putTask(parseInt(projectId!), parseInt(taskId!), updatedTaskDetails, selectedMember.id, parseInt(sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!));

      // Can comment out to stop refreshing
      window.location.reload();
    } catch (err: any) {
      console.log(err);
    }
  }

  const changeMember = (profileId: number) => {
    setSelectedMember(findSelectedMember(profileId, possibleAssignees));
  }

  // Not working 
  const updateStatus = (status: number) => {
    console.log(status)
    // status isnt updating (plan was to update useState then call updateTask)
    setUpdatedTaskDetails({...updatedTaskDetails, status: status});
    updateTask();
  }

  return(
    <>
      {
        isLoading 
        ? 
          <LoadingOverlay isOpen={isLoading}/>
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
                  {
                      isMember
                    ?
                      <Select
                        // label="Your tasks"
                        defaultValue="0"
                        value={updatedTaskDetails.status.toString()}
                        // value={status.toString()}
                        // Have own useState? maybe one for edit (view uses useEffect?)
                        onChange={(e: SelectChangeEvent) => 
                          updateStatus(parseInt(e.target.value))
                          // setStatus(parseInt(e.target.value))
                        }
                        sx={{ width: "16.06vw" }}
                        style={{ height: 50 }}
                      >
                        <MenuItem value={"0"} key={"0"}>Not Started</MenuItem>
                        <MenuItem value={"1"} key={"1"}>In Progress</MenuItem>
                        <MenuItem value={"2"} key={"2"}>Completed</MenuItem>
                        <MenuItem value={"3"} key={"3"}>Blocked</MenuItem>
                      </Select>
                    :
                      <p
                        style={{ backgroundColor: fetchStatusColor(updatedTaskDetails.status), color: "white", borderRadius: "1rem", textAlign: "center", width: "10rem"}}
                      >
                        {taskStatus[updatedTaskDetails.status as keyof TaskStatus]}
                      </p>
                  }
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
                          {
                              taskDetails.profileAssignee 
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
                                {/* Style?? */}
                                <div>{taskDetails.profileAssignee.name}</div>
                              </>
                            :
                              <div>
                                {/* &nbsp; */}
                                Unassigned</div>
                          }
                        </>
                      :
                      <Select
                        defaultValue="1"
                        value={selectedMember === null || selectedMember.id === -1 ? "" : selectedMember.id.toString()}
                        // MAKE NEW FUNCITNO??
                        // onChange={(e: SelectChangeEvent) => findSelectMember(parseInt(e.target.value))}
                        onChange={(e: SelectChangeEvent) => changeMember(parseInt(e.target.value))}
                        sx={{ width: "30%" }}
                        style={{ height: 60, marginLeft: '0.5rem' }}
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