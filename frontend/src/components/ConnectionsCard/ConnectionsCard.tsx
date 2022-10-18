import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import { IProfile } from '../../interfaces/api-response';
import FriendsCard from '../FriendsCard/FriendsCard';

type ConnectionsCardProps = {
    profiles: IProfile[];
    func: Function;
  };
  
const ConnectionsCard = ({ profiles, func }: ConnectionsCardProps) => {

  return (
    <>
        {profiles.map((profile: IProfile) => (
            <Button onClick={() => func(profile.email)} key={profile.id}>
                <p>{profile.name} - {profile.email}</p>
            </Button>
        ))}
    </>
  );
};

export default ConnectionsCard;