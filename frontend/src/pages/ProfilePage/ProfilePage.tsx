import { AboutMeContainer, BodyContainer, FriendsContainer, IconContainer, LeftContainer, ProfilePageContainer, TasksContainer, TopContainer } from "./style";
import { useParams } from "react-router-dom";
// import { getProfile } from "../../api/profile";
// import { useEffect, useState } from "react";
// import { IProfile } from "../../interfaces/api-response";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import FriendsCard from "../../components/FriendsCard/FriendsCard";
import TaskCard from "../../components/TaskCard/TaskCard";

const ProfilePage = () => {
  const [isSelfProfile, setIsSelfProfile] = useState<boolean>(false);
  const { profileId } = useParams();
  
  // const [profileDetails, setProfileDetails] = useState<IProfile>({
  //   name: "",
  //   email: "",
  //   aboutMe: "",
  //   profilePicture: ""
  // });

  // const loadProfile = async () => {
  //   try {
  //     const resp = await getProfile(+profileId!);
  //     console.log(resp);
  //     setProfileDetails(resp);
  //   } catch (err: any) {
  //     console.log(err);
  //   }
  // }

  useEffect(() => {
    if (profileId === sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)) {
      setIsSelfProfile(true);
    };
    // loadProfile();
  }, [profileId]);

  return(
    <ProfilePageContainer>
      <Header />
      <TopContainer>
        <div style={{ height: '100px', width: '100px', backgroundColor: 'gray', borderRadius: "5rem", marginRight: '1rem' }}></div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1>John Smith</h1>
          <p>johnSmith@gmail.com</p>
        </div>
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
            Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
            Suspendisse faucibus mi ac bibendum malesuada.
            Curabitur bibendum enim at finibus feugiat.
            Aliquam erat volutpat.
            Cras maximus velit sed eros feugiat dictum. asdasdasdasdasdasd
            Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
            Suspendisse faucibus mi ac bibendum malesuada.
            Curabitur bibendum enim at finibus feugiat.
            Aliquam erat volutpat.
            Cras maximus velit sed eros feugiat dictum. asdasdasdasdasdasd
          </AboutMeContainer>
          <TasksContainer>
            <h2 style={{ marginTop: '0', fontWeight: 'normal' }}>Assigned tasks</h2>
            <div style={{ display: 'flex', flexDirection: 'row', padding: '0 2rem' }}>
              <p style={{ width: '10%' }}>ID</p>
              <p style={{ width: '50%',}}>Title</p>
              <p style={{ width: '20%' }}>Deadline</p>
              <p style={{ width: '20%' }}>Status</p>
            </div>
            <div style={{ overflowY: 'auto', padding: '0 1rem' }}>
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

            </div>
          </TasksContainer>
        </LeftContainer>
        <FriendsContainer>
          <h2>Friends</h2>
          <div>
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
          </div>
        </FriendsContainer>
      </BodyContainer>
      <Footer />
    </ProfilePageContainer>
  );
}

export default ProfilePage;