import { useEffect, useState } from 'react';
import { FormControl, Input, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ConnectionsCard from "../../components/ConnectionsCard/ConnectionsCard";
import { BodyContainer, DashboardPageContainer } from "./style";
import { getProfiles } from "../../api/profile";

const FriendsPage = () => {
  const [query, setQuery] = useState("");
  const [profiles, setprofiles] = useState([]);

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
    <DashboardPageContainer>
      <Header />
        <p>TaskHub</p>
        <p>Looking for someone to connect with?</p>
        
        <input 
        placeholder="Search"
          onChange={e => setQuery(e.target.value.toLowerCase())}
        />

      {<ConnectionsCard data={search(profiles)}/>}
      <Footer />
    </DashboardPageContainer>
  );
}



export default FriendsPage;