import { useEffect, useState } from 'react';
import { TextField, Button, Alert, Snackbar, AlertColor } from "@mui/material";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ConnectionsCard from "../../components/ConnectionsCard/ConnectionsCard";
import { BodyContainer, FriendsPageContainer } from "./style";
import { getProfiles, getProfile } from "../../api/profile";
import { IProfile } from '../../interfaces/api-response';
import { requestConnection } from '../../api/connect';
import { EmptyProfile } from '../../constants/profile-page-constants';

const FriendsPage = () => {
  const [query, setQuery] = useState('');
  const [profiles, setprofiles] = useState([]);
  const [currentLoggedInProfile, setCurrentLoggedInProfile] = useState<IProfile>(EmptyProfile);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>('success');
  const [alertMessage, setAlertMessage] = useState('');

  const MAX_NUMBER_OF_PROFILES_SHOWN = 6;

  const handleConnectButtonClick = () => {
    if (isSearchQueryEmpty()) {
      setAlertSeverity("error");
      setAlertMessage("Search query is empty.");
    } else if (query === currentLoggedInProfile.email) {
      setAlertSeverity("error");
      setAlertMessage("Can not connect to yourself.");
    } else {
      // now try to send connection
      const profilesPromise = getProfiles();
      // attempt to convert email to profileId
      profilesPromise.then(profiles => {
        const targetProfile = profiles.filter((profile: IProfile) => profile.email === query).at(0);
        if (targetProfile === undefined) {
          setAlertSeverity("error");
          setAlertMessage(`User with email ${query} does not exist.`);
        } else {
          // attempt to request connection
          const requestConnectionPromise = requestConnection(currentLoggedInProfile.id, targetProfile.id)
          requestConnectionPromise.then(response => {
            if (!response.data) {
              setAlertSeverity("warning");
              setAlertMessage(`Already sent a connection request to ${query}.`);
            } else {
              setAlertSeverity("success");
              setAlertMessage(`Sent connection request to ${query}.`);
            }
          })
        }
        }).catch((err) => {
          console.log(err);
        });

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
    setQuery(value);
  }

  const isSearchQueryEmpty = () => {
    return query === '';
  }

  /*
   * filter all profiles based on name and email
   * only show maximum `MAX_NUMBER_OF_PROFILES_SHOWN` results
  */
  const search = (profiles: IProfile[]) => {
    const lowercaseQuery = query.toLocaleLowerCase();
    return profiles.filter((profile: IProfile) => 
      profile.name.toLowerCase().includes(lowercaseQuery) ||
      profile.email.toLowerCase().includes(lowercaseQuery)).slice(0, MAX_NUMBER_OF_PROFILES_SHOWN);
  }

  const fetchCurrentLoggedInUser = async () => {
    try {
      const data = await getProfile(parseInt(
        sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!
      ));
      setCurrentLoggedInProfile(data);
    } catch (err: any) {
      console.log(err);
    }
  };

  const fetchProfiles = async () => {
    try {
      const data = await getProfiles();
      setprofiles(data);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
      fetchCurrentLoggedInUser();
  }, []);

  useEffect(() => {
      fetchProfiles();
  }, [query]);

  return(
    <FriendsPageContainer>
      <Header />
      <BodyContainer>
        <h1>TaskHub</h1>
        <p>Looking for someone to connect with?</p>
        
        <TextField 
          placeholder="Search"
          value={query}
          onChange={e => onSearchFieldChange(e.target.value)}
        />

      {
        !isSearchQueryEmpty() 
        ? search(profiles).map((profile: IProfile) => (
                      <ConnectionsCard
                        key={profile.id}
                        profileId={profile.id}
                        name={profile.name}
                        email={profile.email}
                        imageURL={profile.profilePicture}
                        onSearchFieldChange={onSearchFieldChange}
                      />
                    ))
         : null
      }
        <Button variant="contained" className="connectButton" onClick={handleConnectButtonClick}>
          Connect
        </Button>
      </BodyContainer>

      <Snackbar open={alertOpen} autoHideDuration={5000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <Footer />
    </FriendsPageContainer>
  );
}

export default FriendsPage;