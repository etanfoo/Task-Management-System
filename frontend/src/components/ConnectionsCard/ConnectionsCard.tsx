import { getInitials } from "../../helpers";
import { DetailsContainer, FriendsCardContainer, StyledAvatar } from "./style";

type FriendsCardProps = {
  imageURL: string | null;
  name: string;
  email: string;
  profileId: number;
  onSearchFieldChange: Function;
};

const ConnectionsCard = ({ imageURL, name, email, profileId, onSearchFieldChange}: FriendsCardProps) => {
  return (
    <FriendsCardContainer onClick={() => onSearchFieldChange(email)}>
      {!!imageURL
        ? (
          <img src={imageURL} alt='user avatar' />
        ) : (
          <StyledAvatar>
            {getInitials(name)}
          </StyledAvatar>
        )
      }
      <DetailsContainer>
        <h3>{name}</h3>
        <p>{email}</p>
      </DetailsContainer>

    </FriendsCardContainer>
  );
};

export default ConnectionsCard;