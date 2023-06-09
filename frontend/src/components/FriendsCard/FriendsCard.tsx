import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getInitials } from "../../helpers";
import {
  DeleteButton,
  DetailsContainer,
  FriendsCardContainer,
  FriendsCardEditContainer,
  ProfileContainer,
  StyledAvatar,
  UserAvatar,
} from "./style";
import DeleteIcon from "../../assets/delete.png";
import DeleteOverlay from "../DeleteOverlay/DeleteOverlay";

type FriendsCardProps = {
  imageURL: string | null;
  name: string;
  email: string;
  profileId: number;
  functionality: string;
  projectId: string | null;
  alreadyAdded: boolean;
};

const FriendsCard = ({
  imageURL,
  name,
  email,
  profileId,
  functionality,
  projectId,
  alreadyAdded,
}: FriendsCardProps) => {
  const navigate = useNavigate();

  const [isAdded, setIsAdded] = useState<boolean>(alreadyAdded);
  const [isDelete, setIsDelete] = useState<boolean>(false);

  // Returns either a friends list for profile, project or task
  return (
    <>
      {functionality.includes("profile") ? (
        // For project, contains a delete button to remove from project
        functionality.match("profile-project") &&
        parseInt(sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!) !==
          profileId ? (
          <FriendsCardEditContainer>
            <DeleteOverlay
              isOpen={isDelete}
              content="project-member"
              contentId={projectId!}
              closeCallback={() => setIsDelete(false)}
              memberId={profileId}
              secondaryContentId={null}
            />
            <ProfileContainer onClick={() => navigate(`/profile/${profileId}`)}>
              {!!imageURL ? (
                <UserAvatar src={imageURL} alt="user avatar" />
              ) : (
                <StyledAvatar>{getInitials(name)}</StyledAvatar>
              )}
              <DetailsContainer>
                <h3>{name}</h3>
                <p>{email}</p>
              </DetailsContainer>
            </ProfileContainer>
            <DeleteButton
              src={DeleteIcon}
              alt="edit icon"
              onClick={() => setIsDelete(true)}
            />
          </FriendsCardEditContainer>
        ) : (
          <FriendsCardContainer
            onClick={() => navigate(`/profile/${profileId}`)}
          >
            {!!imageURL ? (
              <img src={imageURL} alt="user avatar" />
            ) : (
              <StyledAvatar>{getInitials(name)}</StyledAvatar>
            )}
            <DetailsContainer>
              <h3>{name}</h3>
              <p>{email}</p>
            </DetailsContainer>
          </FriendsCardContainer>
        )
      ) : (
        // For task, doesn't redirect to user profile page
        <FriendsCardContainer
          onClick={() => setIsAdded((current) => !current)}
          style={{
            backgroundColor: isAdded ? "#57cc99" : "",
            color: isAdded ? "white" : "",
          }}
        >
          {!!imageURL ? (
            <img src={imageURL} alt="user avatar" />
          ) : (
            <StyledAvatar>{getInitials(name)}</StyledAvatar>
          )}
          <DetailsContainer>
            <h3>{name}</h3>
            <p>{email}</p>
          </DetailsContainer>
        </FriendsCardContainer>
      )}
    </>
  );
};

export default FriendsCard;
