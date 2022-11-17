import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { getRequestedConnections } from "../../../api/connect";
import { IProfile } from "../../../interfaces/api-response";
import RequestCard from "./RequestCard/RequestCard";
import { ModalBody, StyledDivider, OverflowContainer } from "./style";

type ConnectionRequestsModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  updateFriendslist: () => void;
};

const ConnectionRequestsModal = ({
  isOpen,
  handleClose,
  updateFriendslist,
}: ConnectionRequestsModalProps) => {
  const [requestConnections, setRequestConnections] = useState<IProfile[]>([]);

  const fetchRequestedConnections = async () => {
    try {
      const requests = await getRequestedConnections(
        parseInt(sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!)
      );
      setRequestConnections(requests);
    } catch (err: any) {
      console.log(err);
    }
  };

  const removeRequestCard = (requestorId: number) => {
    setRequestConnections((requestConnections) =>
      requestConnections.filter((requestor) => requestor.id !== requestorId)
    );
  };

  useEffect(() => {
    fetchRequestedConnections();
    // eslint-disable-next-line
  }, []);

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <ModalBody>
        {requestConnections.length === 0 ? (
          <p>Nothing to see here...</p>
        ) : (
          <>
            <h2>Invitations</h2>
            <StyledDivider />
            <OverflowContainer>
              {requestConnections.map((request, index) => (
                <RequestCard
                  key={request.id}
                  id={request.id}
                  name={request.name}
                  email={request.email}
                  removeRequestCallback={() => {
                    removeRequestCard(request.id);
                    updateFriendslist();
                  }}
                />
              ))}
            </OverflowContainer>
          </>
        )}
      </ModalBody>
    </Modal>
  );
};

export default ConnectionRequestsModal;
