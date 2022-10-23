import { getInitials } from "../../helpers";
import {
  DetailsContainer,
  ConnectionCardContainer,
  StyledAvatar,
} from "./style";

type ConnectionCardProps = {
  imageURL: string | null;
  name: string;
  email: string;
  onSearchFieldChange: Function;
};

const ConnectionsCard = ({
  imageURL,
  name,
  email,
  onSearchFieldChange,
}: ConnectionCardProps) => {
  return (
    <ConnectionCardContainer onClick={() => onSearchFieldChange(email)}>
      {!!imageURL ? (
        <img src={imageURL} alt="user avatar" />
      ) : (
        <StyledAvatar>{getInitials(name)}</StyledAvatar>
      )}
      <DetailsContainer>
        <h3>{name}</h3>
        <p>{email}</p>
      </DetailsContainer>
    </ConnectionCardContainer>
  );
};

export default ConnectionsCard;
