import { Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { deleteProject } from '../../api/project';
import { ButtonsContainer, DeleteOverlayContainer, NoButton, YesButton } from './style';

type DeleteOverlaylProps = {
  isOpen: boolean;
  content: string;
  contentId: string;
  closeCallback: () => void;
}

const DeleteOverlay = ({ isOpen, content, contentId, closeCallback }: DeleteOverlaylProps) => {
  const navigate = useNavigate();

  const deleteContent = async() => {
    try {
      if (content === "project") await deleteProject(contentId, sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!);
      navigate("/dashboard");
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <Modal
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DeleteOverlayContainer>
        <h1>
          Are you sure you want to delete {content}?
        </h1>
        <ButtonsContainer>
          <NoButton variant='contained' onClick={closeCallback}>No</NoButton>
          <YesButton variant='contained' onClick={deleteContent}>Yes</YesButton>
        </ButtonsContainer>
      </DeleteOverlayContainer>
    </Modal>
  );
};

export default DeleteOverlay;