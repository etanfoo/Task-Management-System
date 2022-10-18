import { useEffect, useState } from 'react';
import { TextField, Button, Alert, Snackbar, AlertColor } from "@mui/material";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ConnectionsCard from "../../components/ConnectionsCard/ConnectionsCard";
import { FriendsPageContainer } from "./style";
import { getProfiles } from "../../api/profile";
import { IProfile } from '../../interfaces/api-response';

const FriendsPage = () => {
  const [query, setQuery] = useState('');
  const [profiles, setprofiles] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>('success');
  const [alertMessage, setAlertMessage] = useState('');

  const NUMBER_OF_PROFILES_SHOWN = 10;

  // todo: error when trying to connect to self
  const handleConnectButtonClick = () => {
    if (isSearchQueryEmpty()) {
      setAlertSeverity("error");
      setAlertMessage("Search query is empty.");
    } else {
      setAlertSeverity("success");
      setAlertMessage(`Sent connection request to ${query}.`);
          
    }
    setAlertOpen(true);
  };

  const handleAlertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };

  const onSearchFieldChange = (value: string) => {
    setQuery(value.toLowerCase());
  }

  const isSearchQueryEmpty = () => {
    return query === '';
  }

  /*
   * filter all profiles based on name and email
   * only show 10 results
  */
  const search = (profiles: IProfile[]) => {
    return profiles.filter((profile: any) => 
      profile.name.toLowerCase().includes(query) || profile.email.toLowerCase().includes(query)).slice(0, NUMBER_OF_PROFILES_SHOWN);
  }

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const data = await getProfiles();
        setprofiles(data);
      } catch (err: any) {
        console.log(err);
      }
    };
      fetchProfiles();
  }, [query]);

  return(
    <FriendsPageContainer>
      <Header />
        <h1>TaskHub</h1>
        <p>Looking for someone to connect with?</p>
        
        <TextField 
          placeholder="Search"
          value={query}
          onChange={e => onSearchFieldChange(e.target.value)}
        />

      {
        !isSearchQueryEmpty() ? <ConnectionsCard profiles={search(profiles)} onSearchFieldChange={onSearchFieldChange} /> : null
      }
      <Button variant="contained" onClick={handleConnectButtonClick}>
        Connect
      </Button>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>

      <Footer />
    </FriendsPageContainer>
  );
}



export default FriendsPage;