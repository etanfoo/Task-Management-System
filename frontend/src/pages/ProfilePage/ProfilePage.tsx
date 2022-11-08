import { AboutMeContainer, BodyContainer, DetailsContainer, FriendsContainer, IconContainer, LabelContainer, OverflowContainer, ProfilePageContainer, UpdateButton, StyledAvatar, TasksContainer, TopContainer, CancelButton, EmptyAvatar, StyledLabel, RightContainer, TextFieldStyle, BadgeContainer } from "./style";
import { useParams } from "react-router-dom";
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
import { EmptyProfile, EmptyUpdatedProfileDetails } from "../../constants/profiles";
import { MockTasks } from "../../constants/tasks";
import { toBase64, getInitials } from "../../helpers";
import { IUpdatedProfileDetails } from "../../interfaces/profile";
import { getConnections } from "../../api/connect";
import { Palette } from "../../components/Palette";
import BronzeIcon from "../../assets/bronze.png";
import SilverIcon from "../../assets/silver.png";
import GoldIcon from "../../assets/gold.png";
import DiamondIcon from "../../assets/diamond.png";


const ProfilePage = () => {
  const { profileId } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profileDetails, setProfileDetails] = useState<IProfile>(EmptyProfile);
  const [updatedProfileDetails, setUpdatedProfileDetails] = useState<IUpdatedProfileDetails>(EmptyUpdatedProfileDetails);
  const [pageState, setPageState] = useState<'edit' | 'view'>('view');
  const [friends, setFriends] = useState<IProfile[]>([]);

  const loadProfile = async () => {
    try {
      const data = await getProfile(parseInt(profileId!));
      setProfileDetails(data);
    } catch (err: any) {
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

  const fetchFriends = async () => {
    try {
      const resp = await getConnections(parseInt(profileId!));
      setFriends(resp);
      setIsLoading(false);
    } catch (err: any) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const getBorderColor = () => {
    if (profileDetails.points < 100) {
      return undefined;
    } else if (profileDetails.points < 200) {
      return Palette.bronze;
    } else if (profileDetails.points < 300) {
      return Palette.gray;
    } else if (profileDetails.points < 400) {
      return Palette.gold;
    } else {
      return Palette.diamond; 
    }
  };

  const getTierBadge = () => {
    if (profileDetails.points < 100) {
      return undefined;
    } else if (profileDetails.points < 200) {
      return BronzeIcon;
    } else if (profileDetails.points < 300) {
      return SilverIcon;
    } else if (profileDetails.points < 400) {
      return GoldIcon;
    } else {
      return DiamondIcon; 
    }
  };

  useEffect(() => {
    loadProfile();
    fetchFriends();
    // eslint-disable-next-line
  }, [profileId]);

  return(
    <>
      {isLoading 
        ? <LoadingOverlay isOpen={isLoading}/>
        : (
            <ProfilePageContainer>
              <Header />
              <TopContainer borderColor={getBorderColor()}>
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
                      <BadgeContainer>
                        <h1>{`${profileDetails?.name}`}</h1>
                        {
                          profileDetails.points >= 100 ? (
                            <img src={getTierBadge()} alt="badge" />
                          ) : null
                        }
                      </BadgeContainer>
                    ) : (
                        <TextField
                          placeholder={profileDetails.name}
                          onChange={(e) => setUpdatedProfileDetails({ ...updatedProfileDetails, name: e.target.value })}
                        />
                      )
                    }
                  <p>{profileDetails.email}</p>
                </DetailsContainer>
                {profileId === sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!) ?
                  (
                    <IconContainer>
                      {pageState === 'view'
                        ? (
                          <>
                            <img
                              src={InfoIcon} 
                              onClick={() => window.open(
                                `${window.location.origin}/info`,
                                '_blank',
                              )}
                              alt='info icon'
                            />
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
                              {profileId === sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)
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
                      {friends.length === 0 
                        ?
                          <p>You have no friends...</p>
                        :
                          (friends.map((friend) => (
                            <FriendsCard
                              key={friend.id}
                              profileId={friend.id}
                              name={friend.name}
                              email={friend.email}
                              imageURL={friend.profilePicture}
                              functionality="profile"
                              projectId={null!}
                              alreadyAdded={false}
                            />)
                          )
                        )
                      }
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