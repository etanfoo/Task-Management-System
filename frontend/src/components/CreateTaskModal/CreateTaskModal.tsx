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

type CreateTaskModalProps = {
  isOpen: boolean;
  handleClose: () => void;
}

function valuetext(value: number) {
  return `${value}`;
}

const CreateTaskModal = ({ isOpen, handleClose }: CreateTaskModalProps) => {
  const navigate = useNavigate();
  const [taskDetails, setTaskDetails] = useState<ITasktDetails>(EmptyTask);
  // const [taskDetails, setTaskDetails] = useState<ITasktDetails>(EmptyTask);
  const [userProjects, setUserProjects] = useState<IProject[]>([]);

  const[currentProject, setCurrentProject] = useState<string>("");
  const[projectMembers, setProjectMembers] = useState<IProfile[]>();
  const[selectedMember, setSelectedMember] = useState<string>("");


  const createTask = async () => {
    // const resp = await postTask(taskDetails);
    // console.log(resp)
    // navigate(/)
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

  const clearFields = () => {
    setSelectedMember("");
    setCurrentProject("");
  }


  useEffect(() => {
    // clearFields();
    fetchAllProjects();
  }, []);


  const changeProject = (projectTitle: string) => {
    // Clear selected member
    clearFields();
    setCurrentProject(projectTitle); 
    const currentProjectDetails: IProject = userProjects.filter((project: IProject) => project.title === projectTitle)[0];
    setProjectMembers(currentProjectDetails.profiles);
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
            />
            <h2>Summary</h2>
            <TextField 
              multiline
              rows={6}
              sx={{ width: "100%" }}
            />
            <BottomContainer>
              <div>
                <h2>Deadline</h2>
                <DatePicker />
              </div>
              <div>
                <h2>Project</h2>
                <Select
                  // label="Your tasks"
                  value={currentProject}
                  onChange={(e: SelectChangeEvent) => changeProject(e.target.value)}
                  sx={{ width: "100%" }}
                >
                  {userProjects.map((project)=> (
                    <MenuItem value={project.title}>{project.title}</MenuItem>
                  ))}
                </Select>
              </div>
              <div>
                <h2>Points</h2>
                <Slider
                  aria-label="Temperature"
                  defaultValue={1}
                  getAriaValueText={valuetext}
                  valueLabelDisplay="auto"
                  step={1}
                  // marks
                  min={1}
                  max={10}
                  sx={{ width: "98%" }}
                />
              </div>
              
            </BottomContainer>
            <h2>Assignee</h2>

            <Select
              // label="Your tasks"
              value={selectedMember}
              onChange={(e: SelectChangeEvent) => setSelectedMember(e.target.value)}
              sx={{ width: "30%" }}
            >
              {projectMembers?.map((user)=> (
                <MenuItem value={user.name}>
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