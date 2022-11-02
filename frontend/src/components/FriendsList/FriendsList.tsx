import { useEffect, useState } from "react";
import { getConnections } from "../../api/connect";
import { IProfile } from "../../interfaces/api-response";
import FriendsCard from "../../components/FriendsCard/FriendsCard";
import HappinessTracker from "../../components/HappinessTracker/HappinessTracker";
import { FriendsContainer, FriendsListContainer } from "./style";
import { Divider } from "@mui/material";

const FriendsList = () => {
  const [connections, setConnections] = useState<IProfile[]>([]);

  const fetchFriends = async () => {
    try {
      const friends = await getConnections(parseInt(sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!));
      setConnections(friends);
    } catch (err: any) {
      // todo: figure some error handling here
      console.log(err);
    }
  };

  useEffect(() => {
    // todo: update friends list after accepting --> right now just refreshing window after modal closes
    fetchFriends();
  },[])

  return(
    <FriendsListContainer>
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
    </FriendsListContainer>
  );
}

export default FriendsList;