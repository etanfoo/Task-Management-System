import { Modal } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteMember, deleteProject } from "../../api/project";
import { deleteTask } from "../../api/task";
import Popup from "../Popup/Popup";
import {
  ButtonsContainer,
  DeleteOverlayContainer,
  NoButton,
  YesButton,
} from "./style";

type DeleteOverlaylProps = {
  isOpen: boolean;
  content: string;
  contentId: string;
  closeCallback: () => void;
  memberId: number | null;
  secondaryContentId: number | null;
};

const DeleteOverlay = ({
  isOpen,
  content,
  contentId,
  closeCallback,
  memberId,
  secondaryContentId,
}: DeleteOverlaylProps) => {
  const navigate = useNavigate();

  const [error, setError] = useState<string>("");

  // Deletes either project, project member or task
  const deleteContent = async () => {
    try {
      if (content === "project") {
        await deleteProject(
          contentId,
          sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!
        );
        navigate("/dashboard", { state: { initialPageState: "projects" } });
      } else if (content === "project-member") {
        await deleteMember(
          contentId,
          sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!,
          memberId!
        );
        window.location.reload();
      } else {
        await deleteTask(
          parseInt(contentId),
          secondaryContentId!,
          parseInt(sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!)
        );
        navigate("/dashboard", { state: { initialPageState: "tasks" } });
      }
    } catch (err: any) {
      if (
        err.response.status === 400 &&
        err.response.data.message.includes("assignee")
      )
        setError(
          "User is still assigned to a task, please assign the task to another member"
        );
      console.log(err);
    }
  };

  return (
    <Modal open={isOpen}>
      <DeleteOverlayContainer>
        <Popup
          isOpen={error !== ""}
          popupMessage={error}
          handleClose={() => setError("")}
          type="error"
        />
        <h1>
          Are you sure you want to
          {content === "project-member" ? (
            <> remove this member?</>
          ) : (
            <> delete this {content}?</>
          )}
        </h1>
        <ButtonsContainer>
          <NoButton variant="contained" onClick={closeCallback}>
            No
          </NoButton>
          <YesButton variant="contained" onClick={deleteContent}>
            Yes
          </YesButton>
        </ButtonsContainer>
      </DeleteOverlayContainer>
    </Modal>
  );
};

export default DeleteOverlay;
