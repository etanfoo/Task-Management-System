import {
  AcceptButton,
  ButtonContainer,
  IgnoreButton,
  RequestCardContainer,
  TextContainer,
} from "./style";
import Icon from "../../../../assets/logo.png";
import { acceptConnection, rejectConnection } from "../../../../api/connect";

type RequestCardProps = {
  id: number;
  name: string;
  email: string;
  removeRequestCallback: () => void;
};

const RequestCard = ({
  id,
  name,
  email,
  removeRequestCallback,
}: RequestCardProps) => {
  const handleReject = async () => {
    try {
      await rejectConnection(
        parseInt(sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!),
        id
      );
      removeRequestCallback();
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleAccept = async () => {
    try {
      await acceptConnection(
        parseInt(sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!),
        id
      );
      removeRequestCallback();
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <RequestCardContainer>
      <img alt="avatar" height={50} width={50} src={Icon} />
      <TextContainer>
        <h3>{name}</h3>
        <p>{email}</p>
      </TextContainer>
      <ButtonContainer>
        <IgnoreButton variant="contained" onClick={handleReject}>
          Ignore
        </IgnoreButton>
        <AcceptButton variant="contained" onClick={handleAccept}>
          Accept
        </AcceptButton>
      </ButtonContainer>
    </RequestCardContainer>
  );
};

export default RequestCard;
