import { ProfilePageContainer } from "./style";
import { useParams } from "react-router-dom";
import { getProfile } from "../../api/profile";
import { useEffect, useState } from "react";
import { IProfile } from "../../interfaces/api-response";

const ProfilePage = () => {
  const { profileId } = useParams();

  const [profileDetails, setProfileDetails] = useState<IProfile>({
    name: "",
    email: "",
    aboutMe: "",
    profilePicture: ""
  })

  const loadProfile = async () => {
    try {
      const resp = await getProfile(+profileId!);
      console.log(resp);
      setProfileDetails(resp);
    } catch (err: any) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  return(
    <ProfilePageContainer>
      {/* <img src={profileDetails.profile_pic}></img> */}
      <h1>{profileDetails.name}</h1>
      <div>{profileDetails.email}</div>
      <div>{profileDetails.aboutMe ? profileDetails.aboutMe : "Add an about me"}</div>
    </ProfilePageContainer>
  );
}

export default ProfilePage;