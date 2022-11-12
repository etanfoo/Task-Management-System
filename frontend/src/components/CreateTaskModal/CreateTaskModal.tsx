import { Divider, MenuItem, Modal, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postTask } from "../../api/task";
import { EmptyTaskEdit } from "../../constants/tasks";
import { findSelectedMember, getInitials } from "../../helpers";
import { ITasktDetails } from "../../interfaces/task";
import { BottomContainer, ButtonsContainer, CancelButton, CreateButton, EmptyModal, ModalBody, ModalContainer, StyledAvatar, UserCard } from "./style";
import Slider from '@mui/material/Slider';
import { getProjects } from "../../api/project";
import { IProfile, IProject } from "../../interfaces/api-response";
import { EmptyProjectView } from "../../constants/projects";
import { EmptyProfile } from "../../constants/profiles";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Popup from "../Popup/Popup";

type CreateTaskModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  projectId: string | null;
}

const CreateTaskModal = ({ isOpen, handleClose, projectId }: CreateTaskModalProps) => {
  const navigate = useNavigate();

  const [taskDetails, setTaskDetails] = useState<ITasktDetails>(EmptyTaskEdit);
  const [userProjects, setUserProjects] = useState<IProject[]>([]); 
  const [selectedProject, setSelectedProject] = useState<IProject>(EmptyProjectView);
  const [selectedMember, setSelectedMember] = useState<IProfile>(EmptyProfile);
  const [currProjectId, setCurrProjectId] = useState<string>("");
  const [deadline, setDeadline] = useState<Dayjs | null>(null);
  const [error, setError] = useState<string>("");

  const changeDeadline = (newDeadline: Dayjs | null) => {
    setDeadline(newDeadline);
    if (newDeadline !== null) setTaskDetails({ ...taskDetails, deadline: newDeadline.format('YYYY-MM-DD') });
  };

  const createTask = async () => {
    // todo: Check deadline is past today
    //todo: temp checks??
    if (taskDetails.title === "") {
      setError("Task must have a title.");
      return;
    }

    console.log(selectedProject)


    let resp;
    try {
      if (selectedMember.id === -1) resp = await postTask(taskDetails, parseInt(currProjectId), parseInt(sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!), null);
      else resp = await postTask(taskDetails, parseInt(currProjectId), parseInt(sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!), selectedMember.id);
      navigate(`/project/${currProjectId}/task/${resp.id}`)
    } catch (err: any) {
      if (err.response.status === 400 && err.response.data.message.includes("Description")) setError("Summary must be less than or equal to 1000 characters.");
      else setError("Task must be associated to a project");
      console.log(err)
    }
   
  }

  const fetchAllProjects = async () => {
    try {
      const data = await getProjects(parseInt(sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!));
      setUserProjects(data);

      // If the modal is opened in a project page (refactor?)
      if (projectId !== null) {
        const currentProjectDetails: IProject = data.filter((project: IProject) => project.id === parseInt(projectId))[0];
        setSelectedProject(currentProjectDetails);
        setCurrProjectId(currentProjectDetails.id.toString());
      }
    } catch (err: any) {
      // todo: figure some error handling here? show error popup?
      console.log(err);
    }
  };
  
  useEffect(() => {
    fetchAllProjects();
  }, []);

  // Changes useState to newly selected project, filters using the projectId
  const changeProject = (selectProjectId: number) => {
    const currentProjectDetails: IProject = userProjects.filter((project: IProject) => project.id === selectProjectId)[0];
    setSelectedProject(currentProjectDetails);
    setCurrProjectId(currentProjectDetails.id.toString());
  }
  
  // Changes useState to newly selected member, uses helper function to search an array of profiles using profileId
  const changeMember = (profileId: number) => setSelectedMember(findSelectedMember(profileId, selectedProject.profiles));

  /* 
    - Check deadline is not today?
    - Check a project is selected
    - no title?
  */

  return(
    <Modal open={isOpen} onClose={handleClose}>
      {
        userProjects.length === 0
        ?
        <ModalContainer>
          <EmptyModal><h1>Please create or join a project</h1></EmptyModal>
        </ModalContainer>
        :
        <ModalContainer>
          <Popup
            isOpen={error !== ""}
            popupMessage={error}
            handleClose={() => setError("")}
            type="error"
          />
          <ModalBody>
            <h1>Create a task</h1>
            <Divider />
            <h2>Task title</h2>
            <TextField 
              sx={{ width: "100%" }}
              onChange={(e) => setTaskDetails({ ...taskDetails, title: e.target.value })}
            />
            <h2>Summary</h2>
            <TextField 
              multiline
              rows={6}
              sx={{ width: "100%" }}
              onChange={(e) => setTaskDetails({ ...taskDetails, description: e.target.value })}
            />
            <BottomContainer>
              <div>
                <h2>Deadline</h2>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    inputFormat="DD/MM/YYYY"
                    value={deadline}
                    onChange={changeDeadline}
                    renderInput={(params) => <TextField {...params} sx={{ width: "100%" }}/>}
                  />
                </LocalizationProvider>
              </div>
              <div>
                <h2>Project</h2>
                <Select
                  // label="Your tasks"
                  defaultValue="1"
                  value={currProjectId ? currProjectId : ""}
                  onChange={(e: SelectChangeEvent) => { changeProject(parseInt(e.target.value)) }}
                  sx={{ width: "100%" }}
                >
                  {userProjects.map((project)=> (
                    <MenuItem value={project.id} key={project.id}>{project.title}</MenuItem>
                  ))}
                </Select>
              </div>
              <div>
                <h2>Points</h2>
                <Slider
                  // aria-label="Temperature"
                  defaultValue={1}
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={1}
                  max={10}
                  sx={{ width: "96%" }}
                  style={{ marginTop: '0.5rem', marginLeft: '0.5rem' }}
                  value={taskDetails.points}
                  onChange={(e, val) => setTaskDetails({ ...taskDetails, points: val as number})}
                />
              </div>
            </BottomContainer>
            <h2>Assignee</h2>
            <Select
              defaultValue="1"
              value={selectedMember.id < 1 ? "" : selectedMember.id.toString()}
              // onChange={(e: SelectChangeEvent) => findSelectMember(parseInt(e.target.value))}
              onChange={(e: SelectChangeEvent) => changeMember(parseInt(e.target.value))}
              sx={{ width: "30%" }}
            >
              {selectedProject.profiles.map((user)=> (
                <MenuItem value={user.id} key={user.id}>
                  <UserCard>
                    <StyledAvatar>{getInitials(`${user.name}`)}</StyledAvatar>
                    <h3>{user.name}</h3>
                  </UserCard>
                </MenuItem>
              ))}
            </Select>
            <ButtonsContainer>
              <CancelButton variant='contained' onClick={handleClose}>Cancel</CancelButton>
              <CreateButton variant='contained' onClick={createTask}>Create</CreateButton>
            </ButtonsContainer>
          </ModalBody>
        </ModalContainer>
      }
    </Modal>
  );
}

export default CreateTaskModal;