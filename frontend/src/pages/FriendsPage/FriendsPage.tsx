import { useEffect, useState } from 'react';
import { TextField, Button } from "@mui/material";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ConnectionsCard from "../../components/ConnectionsCard/ConnectionsCard";
import { BodyContainer, FriendsPageContainer } from "./style";
import { getProfiles } from "../../api/profile";

const FriendsPage = () => {
  const [query, setQuery] = useState("");
  const [profiles, setprofiles] = useState([]);

  const onSearchFieldChange = (value: any) => {
    setQuery(value.toLowerCase());
  }

  // filter all profiles based on name and email
  const search = (profiles: any) => {
    return profiles.filter((profile: any) => 
      profile.name.toLowerCase().includes(query) || profile.email.toLowerCase().includes(query));
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

      {<ConnectionsCard data={search(profiles)} func={onSearchFieldChange} />}
      <Button variant="contained">
        Connect
      </Button>
      <Footer />
    </FriendsPageContainer>
  );
}



export default FriendsPage;