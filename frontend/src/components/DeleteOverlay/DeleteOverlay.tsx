import { Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { deleteMember, deleteProject } from '../../api/project';
import { deleteTask } from '../../api/task';
import { ButtonsContainer, DeleteOverlayContainer, NoButton, YesButton } from './style';

type DeleteOverlaylProps = {
  isOpen: boolean;
  content: string;
  // CHange to number
  contentId: string;
  closeCallback: () => void;
  memberId: number | null;
  secondaryContentId: number | null;
}

const DeleteOverlay = ({ isOpen, content, contentId, closeCallback, memberId, secondaryContentId }: DeleteOverlaylProps) => {
  const navigate = useNavigate();

  const deleteContent = async () => {
    try {
      if (content === "project") {
        await deleteProject(contentId, sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!);
        navigate("/dashboard", { state: { initialPageState: "projects" } });
      }
      else if (content === "project-member") {
        await deleteMember(contentId, sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!, memberId!);
        window.location.reload();
      } else {
        await deleteTask(parseInt(contentId), secondaryContentId!, parseInt(sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!));
        navigate("/dashboard", { state: { initialPageState: "authored tasks" } });
      }
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <Modal open={isOpen}>
      <DeleteOverlayContainer>
        <h1>
          Are you sure you want to
          {
            content === "project-member"
              ?
                <> remove this member?</>
              :
                <> delete this {content}?</>
          }
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