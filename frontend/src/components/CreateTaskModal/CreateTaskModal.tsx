import { Divider, MenuItem, Modal, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postTask } from "../../api/task";
import { EmptyTask } from "../../constants/tasks";
import { getInitials } from "../../helpers";
import { ITasktDetails } from "../../interfaces/task";
import DatePicker from "./DatePicker/DatePicker";
import { BottomContainer, ButtonsContainer, CancelButton, CreateButton, EmptyModal, ModalBody, ModalContainer, StyledAvatar, UserCard } from "./style";
import Slider from '@mui/material/Slider';
import { getProjects } from "../../api/project";
import { IProfile, IProject } from "../../interfaces/api-response";
import { EmptyProjectView } from "../../constants/projects";
import { IProjectDetails } from "../../interfaces/project";
import { EmptyProfile } from "../../constants/profiles";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

type CreateTaskModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  projectId: string | null;
}

// function valuetext(value: number) {
  
//   return `${value}`;
// }

const CreateTaskModal = ({ isOpen, handleClose, projectId }: CreateTaskModalProps) => {
  const navigate = useNavigate();
  const [taskDetails, setTaskDetails] = useState<ITasktDetails>(EmptyTask);
  const [userProjects, setUserProjects] = useState<IProject[]>([]); 

  // const[currentProject, setCurrentProject] = useState<string>("");
  // const[projectMembers, setProjectMembers] = useState<IProfile[]>([]);

  const[selectedProject, setSelectedProject] = useState<IProject>(EmptyProjectView);

  const[selectedMember, setSelectedMember] = useState<IProfile>(EmptyProfile);

  const[currProjectId, setCurrProjectId] = useState<string>("");
  
  const[deadline, setDeadline] = useState<string>("");

  const todayDate = new Date().toISOString().slice(0, 10);
  const [value, setValue] = useState<Dayjs | null>(dayjs(todayDate));
  //  console.log()
  // console.log(todayDate)
  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
    if (newValue !== null) setTaskDetails({ ...taskDetails, deadline: newValue.format('YYYY-MM-DD') });
  };

  if (projectId !== null) setCurrProjectId(projectId);

  const createTask = async () => {
    // Check deadline is past today
    console.log(taskDetails)
    let resp;
    if (selectedMember.id === -1) resp = await postTask(taskDetails, currProjectId, parseInt(sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!), null);
    else resp = await postTask(taskDetails, currProjectId, parseInt(sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!), selectedMember.id);
    console.log(resp)
    // Change return type from any
    navigate(`/project/${currProjectId}/task/${resp.id}`)
  }

  const fetchAllProjects = async () => {
    try {
      const data = await getProjects(parseInt(sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!));
      setUserProjects(data);
    } catch (err: any) {
      // todo: figure some error handling here? show error popup?
      console.log(err);
    }
  };

  // const clearFields = () => {
  //   setSelectedMember("");
  //   setCurrentProject("");
  // }

  // const valuetext = (value: number) => {
  //   return `${value}`;
  // }
  
  useEffect(() => {
    // clearFields();
    fetchAllProjects();
  }, []);


  const changeProject = (projectId: number) => {
    // Clear selected member
    // clearFields();
    // console.log(projectId)
    // setCurrentProject(projectTitle); 
    
    // Edge case for projects with same name
    const currentProjectDetails: IProject = userProjects.filter((project: IProject) => project.id === projectId)[0];

    setSelectedProject(currentProjectDetails);
    setCurrProjectId(currentProjectDetails.id.toString());
    // console.log(userProjects.filter((project: IProject) => project.id === projectId))
    // setCurrentProject(currentProjectDetails.title); 
    // setCurrProjectId(currentProjectDetails.id.toString());
    // setProjectMembers(currentProjectDetails.profiles);
  }

  const findSelectMember = (profileId: number) => {
    // const profile = ;
    // console.log(profile)
    setSelectedMember(selectedProject.profiles.filter((user: IProfile) => user.id === profileId)[0]);
  }


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
                {/* <DatePicker deadlineDate={deadline} onChange={(e) => setTaskDetails({ ...taskDetails, description: e.target.value })}/> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    inputFormat="DD/MM/YYYY"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} sx={{ width: "100%" }}/>}
                  />
                </LocalizationProvider>
              </div>
              <div>
                <h2>Project</h2>
                <Select
                  // label="Your tasks"
                  defaultValue=""
                  value={selectedProject.id.toString()}
                  onChange={(e: SelectChangeEvent) => { changeProject(parseInt(e.target.value)) }}
                  sx={{ width: "100%" }}
                  // name={project.title}
                >
                  {userProjects.map((project)=> (
                    <MenuItem value={project.id} key={`${project.id} ${project.title}`}>{project.title}</MenuItem>
                  ))}
                </Select>
              </div>
              <div>
                <h2>Points</h2>
                <Slider
                  // aria-label="Temperature"
                  defaultValue={1}
                  // getAriaValueText={valuetext}
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
              // label="Your tasks"
              value={selectedMember.id.toString()}
              onChange={(e: SelectChangeEvent) => findSelectMember(parseInt(e.target.value))}
              sx={{ width: "30%" }}
            >
              {selectedProject.profiles.map((user)=> (
                <MenuItem value={user.id}>
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