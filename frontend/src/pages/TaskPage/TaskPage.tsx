import { MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTask, putTask } from "../../api/task";
import Footer from "../../components/Footer/Footer";
import FriendsList from "../../components/FriendsList/FriendsList";
import Header from "../../components/Header/Header";
import { EmptyTaskEdit, EmptyTaskView, taskStatus } from "../../constants/tasks";
import { fetchStatusColor, findSelectedMember, formatDate, getInitials } from "../../helpers";
import { IProfile, ITask } from "../../interfaces/api-response";
// import { ITask } from "../../interfaces/api-response";
import { ITasktDetails, TaskStatus } from "../../interfaces/task";
import { BodyContainer, CancelButton, DeadlineContainer, DescriptionContainer, IconContainerEdit, IconContainerView, MainContainer, ProjectLink, StyledAvatar, StyledSlider, TaskContainer, TaskMembers, TaskPageContainer, TitleContainerEdit, TitleContainerView, TopContainer, UpdateButton, UserAvatar, UserAvatarEdit, UserCard } from "./style"
import EditIcon from "../../assets/edit.png";
import DeleteIcon from "../../assets/delete.png";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";
import { EmptyProfile } from "../../constants/profiles";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DeleteOverlay from "../../components/DeleteOverlay/DeleteOverlay";

const TaskPage = () => {
  const navigate = useNavigate();

  const { projectId, taskId } = useParams();
  const [taskDetails, setTaskDetails] = useState<ITask>(EmptyTaskView);
  const [updatedTaskDetails, setUpdatedTaskDetails] = useState<ITasktDetails>(EmptyTaskEdit);
  const [isMember, setIsMember] = useState<boolean>(false);
  const [pageState, setPageState] = useState<'edit' | 'view'>('view');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [possibleAssignees, setPossibleAssignees] = useState<IProfile[]>([]);
  const [selectedMember, setSelectedMember] = useState<IProfile>(EmptyProfile);
  const [isDelete, setIsDelete] = useState<boolean>(false); 
  const [status, setStatus] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const [deadline, setDeadline] = useState<Dayjs | null>(null);
  const [projectTitle, setProjectTitle] = useState<string>("");
  const [changedStatus, setChangedStatus] = useState<boolean>(false);

  const loadTask = async () => {
    try {
      const resp = await getTask(parseInt(projectId!), parseInt(taskId!));
      setTaskDetails(resp);
      setProjectTitle(resp.project.title);
      setPossibleAssignees(resp.project.profiles);
      setSelectedMember(resp.profileAssignee);
      setDeadline(dayjs(resp.deadline));
      setStatus(resp.status);
      setPoints(resp.points);

      const profileId = parseInt(sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!);
      // Only author and assignee can edit the task
      if (resp.profileAuthor.id === profileId || resp.profileAssignee.id === profileId) setIsMember(true);

      setIsLoading(false);
    } catch (err: any) {
      console.log(err);
      setIsLoading(false);
    };
  };

  const updateTask = async () => {
    // If the user presses update button but no fields were changed 
    if (updatedTaskDetails.title === "" && updatedTaskDetails.deadline === "" && status === taskDetails.status && points === taskDetails.points && selectedMember.id === taskDetails.profileAssignee.id && updatedTaskDetails.description === "") {
      setPageState("view");
      return;
    } 

    // Check if the user provided a new input, if not use the previous input
    updatedTaskDetails.title = (updatedTaskDetails.title !== "" ? updatedTaskDetails.title : taskDetails.title);
    updatedTaskDetails.deadline = (!!updatedTaskDetails.deadline ? updatedTaskDetails.deadline : taskDetails.deadline);
    updatedTaskDetails.description = (!!updatedTaskDetails.description ? updatedTaskDetails.description : taskDetails.description);
    updatedTaskDetails.points = (points !== taskDetails.points  ? taskDetails.points: points);
    updatedTaskDetails.status = (updatedTaskDetails.status !== taskDetails.status ? updatedTaskDetails.status : taskDetails.status);
  
    try {
      await putTask(
        parseInt(projectId!), 
        parseInt(taskId!), 
        updatedTaskDetails, 
        selectedMember.id, 
        parseInt(sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!)
      );
      window.location.reload();
    } catch (err: any) {
      console.log(err);
    };
  };

  const cancelEditTask = () => {
    setPageState("view");
    setUpdatedTaskDetails(EmptyTaskEdit);
  };

  const changeDeadline = (newDeadline: Dayjs | null) => {
    setDeadline(newDeadline);
    if (newDeadline !== null) setUpdatedTaskDetails({ ...updatedTaskDetails, deadline: newDeadline.format('YYYY-MM-DD') });
  };

  const changeMember = (profileId: number) => {
    setSelectedMember(findSelectedMember(profileId, possibleAssignees));
  };

  const updateStatus = (status_num: number) => {
    setUpdatedTaskDetails({...updatedTaskDetails, status: status_num});
    setStatus(status_num);
    // Triggers the useEffect 
    if (pageState === "view") setChangedStatus(true);
  };

  useEffect(() => {
    loadTask();
    // eslint-disable-next-line
  }, [taskId]);

  useEffect(() => {
    const updateTaskStatus = async () => {
      // Doesn't trigger on initial page load
      if (changedStatus) {
        updatedTaskDetails.title = taskDetails.title;
        updatedTaskDetails.points = taskDetails.points;
        updatedTaskDetails.description = taskDetails.description;
        updatedTaskDetails.status = status;
        await putTask(
          parseInt(projectId!), 
          parseInt(taskId!), 
          updatedTaskDetails, 
          selectedMember.id, 
          parseInt(sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!)
        );
      }
    };
    updateTaskStatus();
    // eslint-disable-next-line
  }, [changedStatus]);

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
                          <ProjectLink onClick={() => navigate(`/project/${projectId}`)}>{projectTitle}</ProjectLink>
                          <h1>&nbsp;| {taskDetails.title} [{taskDetails.points} points]</h1>
                          {isMember
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
                          <StyledSlider
                            defaultValue={taskDetails.points}
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={1}
                            max={10}
                            sx={{ width: "25%" }}
                            value={taskDetails.points}
                            onChange={(e, val) => setTaskDetails({ ...taskDetails, points: val as number})}
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
                              value={deadline}
                              onChange={changeDeadline}
                              renderInput={(params) => <TextField {...params} sx={{ width: "17%" }}/>}
                            />
                          </LocalizationProvider>
                        </DeadlineContainer>
                      </TopContainer>
                  }
                  {
                      isMember
                    ?
                      <Select
                        value={status.toString()}
                        onChange={(e: SelectChangeEvent) => updateStatus(parseInt(e.target.value))}
                        sx={{ width: "16.06vw" }}
                        style={{ height: 50 }}
                      >
                        <MenuItem value={"0"} key={"0"}>
                          <p
                            style={{ backgroundColor: fetchStatusColor(0), color: "white", borderRadius: "1rem", textAlign: "center", width: "13vw"}}
                          >
                            Not Started
                          </p>
                        </MenuItem>
                        <MenuItem value={"1"} key={"1"}>
                          <p
                            style={{ backgroundColor: fetchStatusColor(1), color: "white", borderRadius: "1rem", textAlign: "center", width: "13vw"}}
                          >
                            In Progress
                          </p>
                        </MenuItem>
                        <MenuItem value={"2"} key={"2"}>
                          <p
                            style={{ backgroundColor: fetchStatusColor(2), color: "white", borderRadius: "1rem", textAlign: "center", width: "13vw"}}
                          >
                            Completed
                          </p>
                        </MenuItem>
                        <MenuItem value={"3"} key={"3"}>
                          <p
                            style={{ backgroundColor: fetchStatusColor(3), color: "white", borderRadius: "1rem", textAlign: "center", width: "13vw"}}
                          >
                            Blocked
                          </p>
                        </MenuItem>
                      </Select>
                    :
                      <p
                        style={{ backgroundColor: fetchStatusColor(taskDetails.status), color: "white", borderRadius: "1rem", textAlign: "center", width: "10rem"}}
                      >
                        {taskStatus[taskDetails.status as keyof TaskStatus]}
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
                          {!!taskDetails.profileAssignee.profilePicture
                            ? (
                              <UserAvatar src={taskDetails.profileAssignee.profilePicture} alt='assignee avatar' />
                            ) : (
                              <StyledAvatar>
                                {getInitials(taskDetails.profileAssignee.name)}
                              </StyledAvatar>
                            )
                          }
                          <div>{taskDetails.profileAssignee.name}</div>
                        </>  
                      :
                      <Select
                        value={selectedMember === null || selectedMember.id === -1 ? "" : selectedMember.id.toString()}
                        onChange={(e: SelectChangeEvent) => changeMember(parseInt(e.target.value))}
                        sx={{ width: "30%" }}
                        style={{ height: 60, marginLeft: '0.5rem' }}
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
            </MainContainer>
          </BodyContainer>
          <Footer />
        </TaskPageContainer>
      }
    </>
  )
}

export default TaskPage;