import { Divider, MenuItem, Modal, Select, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postTask } from "../../api/task";
import { EmptyTask } from "../../constants/tasks";
import { getInitials } from "../../helpers";
import { ITasktDetails } from "../../interfaces/task";
import DatePicker from "./DatePicker/DatePicker";
import { BottomContainer, ButtonsContainer, CancelButton, CreateButton, DeadlineContainer, ModalBody, ModalContainer, StyledAvatar, UserCard } from "./style";


type CreateTaskModalProps = {
  isOpen: boolean;
  handleClose: () => void;
}

const CreateTaskModal = ({ isOpen, handleClose }: CreateTaskModalProps) => {
  const navigate = useNavigate();
  const [taskDetails, setTaskDetails] = useState<ITasktDetails>(EmptyTask);
  const createTask = async () => {
    // const resp = await postTask(taskDetails);
    // console.log(resp)
    // navigate(/)
  }

  return(
    <Modal open={isOpen} onClose={handleClose}>
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
            <DeadlineContainer>
              <h2>Project</h2>
              <Select
                // label="Your tasks"
                value={"project"}
                // onChange={(e: SelectChangeEvent) => setPageState(e.target.value)}
                sx={{ width: "100%" }}
              >
                <MenuItem value={"project"}>Project 1</MenuItem>
              </Select>
            </DeadlineContainer>
          </BottomContainer>
          <h2>Assignee</h2>
          <UserCard>
            <StyledAvatar>{getInitials("Terence Huang")}</StyledAvatar>
            <h3>Terence Huang</h3>
          </UserCard>
          
          <ButtonsContainer>
            <CancelButton variant='contained' onClick={handleClose}>Cancel</CancelButton>
            <CreateButton variant='contained' onClick={createTask}>Create</CreateButton>
          </ButtonsContainer>
        </ModalBody>
      </ModalContainer>
    </Modal>
  );
}

export default CreateTaskModal;