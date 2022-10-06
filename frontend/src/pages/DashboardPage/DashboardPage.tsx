import { DashboardPageContainer, ProfileButton, ProfileLink } from "./style";
// import { useState } from 'react';
// import { getProfile } from "../../api/dashboard";

const DashboardPage = () => {
  // const []
  // const a = 0

  // const viewOwnProfile = async () => {
  //   try {
  //     const profileId = sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!);
  //     const resp = await getProfile(+profileId!);

  //   } catch {

  //   }
  // }

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