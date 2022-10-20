import { AcceptButton, ButtonContainer, IgnoreButton, RequestCardContainer, TextContainer } from "./style";
import Icon from "../../../../assets/logo.png";

type RequestCardProps = {
  id: number;
  name: string;
  email: string;
}

const RequestCard = ({ id, name, email }: RequestCardProps) => {
  return (
    <RequestCardContainer>
      <img alt='avatar' height={50} width={50} src={Icon} />      
      <TextContainer>
        <h3>{name}</h3>
        <p>{email}</p>
      </TextContainer>
      <ButtonContainer>
        {/* todo: update onclick functionality */}
        <IgnoreButton variant='contained'>
          Ignore
        </IgnoreButton>
        <AcceptButton variant='contained'>
          Accept
        </AcceptButton>
      </ButtonContainer>
    </RequestCardContainer>
  )
};

export default RequestCard;