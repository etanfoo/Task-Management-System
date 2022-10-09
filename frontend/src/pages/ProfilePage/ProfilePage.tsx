import { AboutMeContainer, BodyContainer, DetailsContainer, FriendsContainer, IconContainer, LabelContainer, LeftContainer, OverflowContainer, ProfilePageContainer, TasksContainer, TopContainer } from "./style";
import { useParams } from "react-router-dom";
import { getProfile } from "../../api/profile";
import { useEffect, useState } from "react";
import { IProfile } from "../../interfaces/api-response";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import FriendsCard from "../../components/FriendsCard/FriendsCard";
import TaskCard from "../../components/TaskCard/TaskCard";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";

const ProfilePage = () => {
  const { profileId } = useParams();
  const [isSelfProfile, setIsSelfProfile] = useState<boolean>(false);
  const [profileDetails, setProfileDetails] = useState<IProfile | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadProfile = async () => {
    try {
      const data = await getProfile(parseInt(profileId!));
      console.log(data);
      setProfileDetails(data);
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      console.log(err);
    }
  }

  useEffect(() => {
    if (profileId === sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)) {
      setIsSelfProfile(true);
    };
    loadProfile();
  }, [profileId]);

  return(
    <>
      {isLoading 
        ? <LoadingOverlay isOpen={isLoading}/>
        : (
          <ProfilePageContainer>
            <Header />
            <TopContainer>
              <div style={{ height: '100px', width: '100px', backgroundColor: 'gray', borderRadius: "5rem", marginRight: '1rem' }}></div>
              <DetailsContainer>
                <h1>{profileDetails?.name}</h1>
                <p>{profileDetails?.email}</p>
              </DetailsContainer>
              {isSelfProfile ?
                (
                  <IconContainer>
                    <div style={{ height: '50px', width: '50px', backgroundColor: 'gray', borderRadius: "5rem" }}></div>
                    <div style={{ height: '50px', width: '50px', backgroundColor: 'gray', borderRadius: "5rem" }}></div>
                  </IconContainer>
                ) : null
              }
            </TopContainer>
            <BodyContainer>
              <LeftContainer>
                <AboutMeContainer>
                  {profileDetails?.aboutMe ||
                    <p>
                      {isSelfProfile
                        ? "Tell us a little about yourself..."
                        : "This user has yet to provide a bio."
                      }
                    </p>
                  }
                </AboutMeContainer>
                <TasksContainer>
                  <h2>Assigned tasks</h2>
                  <LabelContainer>
                    <p>ID</p>
                    <p>Title</p>
                    <p>Deadline</p>
                    <p>Status</p>
                  </LabelContainer>
                  <OverflowContainer>
                  <TaskCard
                      taskId="1"
                      title="Finish report"
                      deadline="12/12/2022"
                      status="In progress"
                    />
                    <TaskCard
                      taskId="1"
                      title="Finish report"
                      deadline="12/12/2022"
                      status="In progress"
                    />
                    <TaskCard
                      taskId="1"
                      title="Finish report"
                      deadline="12/12/2022"
                      status="In progress"
                    />
                    <TaskCard
                      taskId="1"
                      title="Finish report"
                      deadline="12/12/2022"
                      status="In progress"
                    />
                    <TaskCard
                      taskId="1"
                      title="Finish report"
                      deadline="12/12/2022"
                      status="In progress"
                    />

                  </OverflowContainer>
                </TasksContainer>
              </LeftContainer>
              <FriendsContainer>
                <h2>Friends</h2>
                <OverflowContainer>
                  <FriendsCard
                    profileId={2}
                    name="John Smith"
                    email="asd@email.com"
                    imageURL={null}
                  />
                  <FriendsCard
                    profileId={2}
                    name="John Smith"
                    email="asd@email.com"
                    imageURL={null}
                  />
                  <FriendsCard
                    profileId={2}
                    name="John Smith"
                    email="asd@email.com"
                    imageURL={null}
                  />
                  <FriendsCard
                    profileId={2}
                    name="John Smith"
                    email="asd@email.com"
                    imageURL={null}
                  />
                  <FriendsCard
                    profileId={2}
                    name="John Smith"
                    email="asd@email.com"
                    imageURL={null}
                  />
                  <FriendsCard
                    profileId={2}
                    name="John Smith"
                    email="asd@email.com"
                    imageURL={null}
                  />
                  <FriendsCard
                    profileId={2}
                    name="John Smith"
                    email="asd@email.com"
                    imageURL={null}
                  />
                  <FriendsCard
                    profileId={2}
                    name="John Smith"
                    email="asd@email.com"
                    imageURL={null}
                  />
                </OverflowContainer>
              </FriendsContainer>
            </BodyContainer>
            <Footer />
          </ProfilePageContainer>
        )
      }
    </>
  );
}

export default ProfilePage;