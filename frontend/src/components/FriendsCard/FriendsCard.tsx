import { useNavigate } from "react-router-dom";
import { DetailsContainer, FriendsCardContainer, StyledAvatar } from "./style";

type FriendsCardProps = {
  // todo: check type if empty
  imageURL: string | null;
  name: string;
  email: string;
  profileId: number;
};

const FriendsCard = ({ imageURL, name, email, profileId }: FriendsCardProps) => {
  const navigate = useNavigate();

  return (
    <FriendsCardContainer onClick={() => navigate(`/profile/${profileId}`)}>
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

export default FriendsCard;