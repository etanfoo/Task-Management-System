import { Modal } from "@mui/material";
import { MockFriends } from "../../../constants/profiles";
import RequestCard from "./RequestCard/RequestCard";
import { ModalBody, StyledDivider, OverflowContainer } from "./style";

type ConnectionRequestsModalProps = {
  isOpen: boolean;
  handleClose: () => void;
}

const ConnectionRequestsModal = ({ isOpen, handleClose }: ConnectionRequestsModalProps) => {
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <ModalBody>
        <h2>Invitations</h2>
        <StyledDivider />
        <OverflowContainer>
          {MockFriends.map((person) => (
            <RequestCard
              key={person.profileId}
              id={person.profileId}
              name={person.name}
              email={person.email}
            />
          ))}
        </OverflowContainer>
      </ModalBody>
    </Modal>
  );
};

export default ConnectionRequestsModal;