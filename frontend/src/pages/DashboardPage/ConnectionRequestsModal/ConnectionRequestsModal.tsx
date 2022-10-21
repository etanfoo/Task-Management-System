import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { getRequestedConnections } from "../../../api/connections";
import { IProfile } from "../../../interfaces/api-response";
import RequestCard from "./RequestCard/RequestCard";
import { ModalBody, StyledDivider, OverflowContainer } from "./style";

type ConnectionRequestsModalProps = {
  isOpen: boolean;
  handleClose: () => void;
}

const ConnectionRequestsModal = ({ isOpen, handleClose }: ConnectionRequestsModalProps) => {
  const [requestConnections, setRequestConnections] = useState<IProfile[]>([]);

  const fetchRequestedConnections = async () => {
    try {
      const requests = await getRequestedConnections(
        parseInt(sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!)
      );
      console.log(requests);
      setRequestConnections(requests);
    } catch (err: any) {
      // todo: do some error handling
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequestedConnections();
  }, []);

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <ModalBody>
        {requestConnections.length === 0
          ? (
            <p>Nothing to see here...</p>
          ): (
            <>
              <h2>Invitations</h2>
              <StyledDivider />
              <OverflowContainer>
                {requestConnections.map((request) => (
                  <RequestCard
                    key={request.id}
                    id={request.id}
                    name={request.name}
                    email={request.email}
                  />
                ))
                }
              </OverflowContainer>
            </>
          )
        }
      </ModalBody>
    </Modal>
  );
};

export default ConnectionRequestsModal;