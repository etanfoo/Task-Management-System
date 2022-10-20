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
            {name.split(' ')[0][0] + name.split(' ')[1][0]}
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