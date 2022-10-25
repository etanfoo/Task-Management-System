import { AboutMeContainer, BodyContainer, DetailsContainer, FriendsContainer, IconContainer, LabelContainer, OverflowContainer, ProfilePageContainer, UpdateButton, StyledAvatar, TasksContainer, TopContainer, CancelButton, EmptyAvatar, StyledLabel, RightContainer, TextFieldStyle } from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { getProfile, putProfile } from "../../api/profile";
import { ChangeEvent, useEffect, useState } from "react";
import { IProfile } from "../../interfaces/api-response";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import FriendsCard from "../../components/FriendsCard/FriendsCard";
import TaskCard from "../../components/TaskCard/TaskCard";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";
import EditIcon from "../../assets/edit.png";
import InfoIcon from "../../assets/info.png";
import { TextField } from "@mui/material";
import { EmptyProfile, EmptyUpdatedProfileDetails, MockFriends } from "../../constants/profiles";
import { MockTasks } from "../../constants/tasks";
import { toBase64, getInitials } from "../../helpers";
import { IUpdatedProfileDetails } from "../../interfaces/profile";
import { getConnections } from "../../api/connect";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { profileId } = useParams();
  const [isSelfProfile, setIsSelfProfile] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profileDetails, setProfileDetails] = useState<IProfile>(EmptyProfile);
  const [updatedProfileDetails, setUpdatedProfileDetails] = useState<IUpdatedProfileDetails>(EmptyUpdatedProfileDetails);
  const [pageState, setPageState] = useState<'edit' | 'view'>('view');
  const [members, setMembers] = useState<IProfile[]>([]);

  const loadProfile = async () => {
    try {
      const data = await getProfile(parseInt(profileId!));
      setProfileDetails(data);
      // setIsLoading(false);
    } catch (err: any) {
      // setIsLoading(false);
      console.log(err);
    }
  };

  const updateLogo = async (e: ChangeEvent) => {
    const file = (e.target as HTMLInputElement).files![0];
    const convertedFile = await toBase64(file);
    setUpdatedProfileDetails({ ...updatedProfileDetails, profilePicture: convertedFile as string });
  };

  const updateProfile = async () => {
    if (
      updatedProfileDetails.name === ""
      && updatedProfileDetails.aboutMe === ""
      && updatedProfileDetails.profilePicture === ""
    ) {
      setPageState('view');
      return;
    }
    console.log(updatedProfileDetails.profilePicture);
    try {
      await putProfile(
        parseInt(profileId!),
        !!updatedProfileDetails.name ? updatedProfileDetails.name : profileDetails.name,
        !!updatedProfileDetails.profilePicture ? updatedProfileDetails.profilePicture : profileDetails.profilePicture,
        !!updatedProfileDetails.aboutMe ? updatedProfileDetails.aboutMe : profileDetails.aboutMe,
      );
      window.location.reload();
    } catch (err: any) {
      console.log(err);
    }
  };

  const cancelEditProfile = () => {
    setPageState('view');
    setUpdatedProfileDetails(EmptyUpdatedProfileDetails);
  };

  const loadMembers = async () => {
    try {
      const resp = await getConnections(parseInt(sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!));
      setMembers(resp);
      setIsLoading(false);
    } catch (err: any) {
      console.log(err);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (profileId === sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)) {
      setIsSelfProfile(true);
    };
    loadProfile();
    loadMembers();
    // eslint-disable-next-line
  }, [profileId]);

  return(
    <>
      {isLoading 
        ? <LoadingOverlay isOpen={isLoading}/>
        : (
            <ProfilePageContainer>
              <Header />
              <TopContainer>
                {pageState === 'view'
                  ? (
                    profileDetails.profilePicture
                      ? <img src={profileDetails.profilePicture} alt='user avatar'/>
                      : (
                        <StyledAvatar>
                          {getInitials(profileDetails.name)}
                        </StyledAvatar>
                      )
                  ) : (
                    <StyledLabel>
                      {!!updatedProfileDetails.profilePicture
                        ? (
                          <img src={updatedProfileDetails.profilePicture} alt='user avatar'/>
                        ) : (
                          profileDetails.profilePicture
                            ? <img src={profileDetails.profilePicture} alt='user avatar'/>
                            : <EmptyAvatar />
                        )
                      }
                      <input
                        type='file'
                        accept='.jpg, .png'
                        onChange={updateLogo}
                      />              
                    </StyledLabel>
                  )
                }
                <DetailsContainer>
                  {pageState === 'view'
                    ? (
                      <h1>{`${profileDetails?.name} (Busyness - 20%)`}</h1>
                    ) : (
                        <TextField
                          placeholder={profileDetails.name}
                          onChange={(e) => setUpdatedProfileDetails({ ...updatedProfileDetails, name: e.target.value })}
                        />
                      )
                    }
                  <p>{profileDetails.email}</p>
                </DetailsContainer>
                {isSelfProfile ?
                  (
                    <IconContainer>
                      {/* todo: update url of info page? */}
                      {pageState === 'view'
                        ? (
                          <>
                            <img src={InfoIcon} onClick={() => navigate('/info')} alt='info icon' />
                            <img src={EditIcon} onClick={() => setPageState('edit')} alt='edit icon' />
                          </>
                        ) : (
                          <>
                            <CancelButton variant='contained' onClick={cancelEditProfile}>Cancel</CancelButton>
                            <UpdateButton variant='contained' onClick={() => updateProfile()}>Update</UpdateButton>
                          </>
                        )
                      }
                    </IconContainer>
                  ) : null
                }
              </TopContainer>
              <BodyContainer>
                <TasksContainer>
                  <h2>Assigned tasks</h2>
                  <LabelContainer>
                    <p>ID</p>
                    <p>Title</p>
                    <p>Deadline</p>
                    <p>Status</p>
                  </LabelContainer>
                  <OverflowContainer>
                    {/* todo: replace with real data returned from api */}
                    {MockTasks.map((task) => (
                      <TaskCard
                        key={task.taskId}
                        taskId={task.taskId}
                        title={task.title}
                        deadline={task.deadline}
                        status={task.status}
                      />
                    ))}
                  </OverflowContainer>
                </TasksContainer>
                <RightContainer>
                  <AboutMeContainer>
                      {pageState === 'view'
                        ? (
                          profileDetails.aboutMe ||
                            <p>
                              {isSelfProfile
                                ? "Tell us a little about yourself..."
                                : "This user has yet to provide a bio."
                              }
                            </p>
                        ) : (
                          <TextField
                            multiline
                            rows={4}
                            placeholder="Tell us a little about yourself..."
                            onChange={(e) => setUpdatedProfileDetails({...updatedProfileDetails, aboutMe: e.target.value })}
                            sx={TextFieldStyle}
                            inputProps={{ style: { color: "white"} }}
                          />
                        )
                      }
                    </AboutMeContainer>
                  <FriendsContainer>
                    <h2>Friends</h2>
                    <OverflowContainer>
                      {/* todo: replace with real data returned from api */}
                      {members.map((friend) => (
                        <FriendsCard
                          key={friend.id}
                          profileId={friend.id}
                          name={friend.name}
                          email={friend.email}
                          imageURL={friend.profilePicture}
                          functionality="profile"
                        />
                      ))}
                    </OverflowContainer>
                  </FriendsContainer>
                </RightContainer>
              </BodyContainer>
              <Footer />
            </ProfilePageContainer>
          )
        }
    </>  
  );
}

export default ProfilePage;