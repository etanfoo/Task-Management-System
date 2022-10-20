import { IProfile } from '../../interfaces/api-response';
import { Button } from "@mui/material";

type ConnectionsCardProps = {
    profiles: IProfile[];
    onSearchFieldChange: Function;
  };
  
const ConnectionsCard = ({ profiles, onSearchFieldChange }: ConnectionsCardProps) => {

  return (
    <>
        {profiles.map((profile: IProfile) => (
            <Button className="connectionsCardButton" onClick={() => onSearchFieldChange(profile.email)} key={profile.id}>
               <p>{profile.name} - {profile.email}</p>
            </Button>
        ))}
    </>
  );
};

export default ConnectionsCard;