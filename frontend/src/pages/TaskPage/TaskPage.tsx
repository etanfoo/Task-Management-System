import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getConnections } from "../../api/connect";
import Footer from "../../components/Footer/Footer";
import FriendsCard from "../../components/FriendsCard/FriendsCard";
import HappinessTracker from "../../components/HappinessTracker/HappinessTracker";
import Header from "../../components/Header/Header";
import { IProfile } from "../../interfaces/api-response";
import { FriendsContainer, LeftContainer, TaskPageContainer } from "./style";

const TaskPage = () => {
  const { taskId } = useParams();
  const [connections, setConnections] = useState<IProfile[]>([]);

  const fetchFriends = async () => {
    try {
      const friends = await getConnections(
        parseInt(sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!)
      );
      setConnections(friends);
    } catch (err: any) {
      // todo: figure some error handling here
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFriends();

  },[])

  return(
    <TaskPageContainer>
      <Header />
      <LeftContainer>
          {connections.length !== 0
            ? (
              <>
                <h2>Your friends</h2>
                <FriendsContainer>
                  {connections.map((connection) => (
                    <FriendsCard
                      key={connection.id}
                      profileId={connection.id}
                      name={connection.name}
                      email={connection.email}
                      imageURL={connection.profilePicture}
                      functionality="profile"
                      projectId={null!}
                      alreadyAdded={false}
                    />
                  ))}
                </FriendsContainer>
                <Divider sx={{ margin: '1rem 0' }} />
              </>
            ) : null
          }
          <HappinessTracker />
        </LeftContainer>
      <Footer />
    </TaskPageContainer>
  )
}

export default TaskPage;