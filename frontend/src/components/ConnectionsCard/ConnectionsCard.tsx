import { Button } from "@mui/material";
import { IProfile } from '../../interfaces/api-response';

type ConnectionsCardProps = {
    profiles: IProfile[];
    onSearchFieldChange: Function;
  };
  
const ConnectionsCard = ({ profiles, onSearchFieldChange }: ConnectionsCardProps) => {

  return (
    <>
        {profiles.map((profile: IProfile) => (
            <Button onClick={() => onSearchFieldChange(profile.email)} key={profile.id}>
               <p>{profile.name} - {profile.email}</p>
            </Button>
        ))}
    </>
  );
};

export default ConnectionsCard;