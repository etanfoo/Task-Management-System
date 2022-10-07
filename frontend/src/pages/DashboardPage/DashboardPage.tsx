import { DashboardPageContainer, ProfileButton, ProfileLink } from "./style";
// import { useState } from 'react';


const DashboardPage = () => {

  return(
    <DashboardPageContainer>
      <h1>Dashboard</h1>
      <ProfileButton variant="contained">
        <ProfileLink to={`/profile/${sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)}`}>
          Profile
        </ProfileLink>
      </ProfileButton>
    </DashboardPageContainer>
  );
}

export default DashboardPage;