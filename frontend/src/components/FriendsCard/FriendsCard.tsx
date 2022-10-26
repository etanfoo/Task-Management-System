import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getInitials } from "../../helpers";
import { DeleteButton, DetailsContainer, FriendsCardContainer, FriendsCardEditContainer, ProfileContainer, StyledAvatar, UserAvatar } from "./style";
import DeleteIcon from "../../assets/delete.png";
import DeleteOverlay from "../DeleteOverlay/DeleteOverlay";

type FriendsCardProps = {
  // todo: check type if empty
  imageURL: string | null;
  name: string;
  email: string;
  profileId: number;
  functionality: string;
  projectId: string | null;
};

const FriendsCard = ({ imageURL, name, email, profileId, functionality, projectId }: FriendsCardProps) => {
  const navigate = useNavigate();
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false); 

  return (
    <>
      {
        functionality.includes("profile") ?
          (
            functionality.match("profile-project") && (parseInt(sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!) !== profileId) ?
            <FriendsCardEditContainer>
              <DeleteOverlay isOpen={isDelete} content="project-member" contentId={projectId!} closeCallback={() => setIsDelete(false)} memberId={profileId}/>
              <ProfileContainer onClick={() => navigate(`/profile/${profileId}`)}>
                {!!imageURL
                  ? (
                    <UserAvatar src={imageURL} alt='user avatar' />
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
              </ProfileContainer>
              <DeleteButton src={DeleteIcon} alt='edit icon' onClick={() => setIsDelete(true)}/>
            </FriendsCardEditContainer>
          :
            <FriendsCardContainer onClick={() => navigate(`/profile/${profileId}`)}>
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
          )
        :
          <FriendsCardContainer 
            onClick={() => setIsAdded(current => !current)}
            style={{
              backgroundColor: isAdded ? '#57cc99' : '',
              color: isAdded ? 'white' : '',
            }}
          >
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
        }
    </>
  );
};

export default FriendsCard;