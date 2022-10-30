import { useEffect, useState } from "react";
import {
  BottomContainer,
  EmotionContainer,
  HappinessTrackerContainer,
} from "./style";
import HappyFace from "./../../assets/happy_face.png";
import ComfortableFace from "./../../assets/comfortable_face.png";
import NeturalFace from "./../../assets/netural_face.png";
import WorriedFace from "./../../assets/worried_face.png";
import StressedFace from "./../../assets/stressed_face.png";
import { getProfile } from "../../api/profile";
import { IProfile } from "../../interfaces/api-response";
import { EmptyProfile } from "../../constants/profiles";

const HappinessTracker = () => {
  const [currentLoggedInProfile, setCurrentLoggedInProfile] =
    useState<IProfile>(EmptyProfile);

  const fetchCurrentLoggedInUser = async () => {
    try {
      const data = await getProfile(
        parseInt(sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!)
      );
      setCurrentLoggedInProfile(data);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCurrentLoggedInUser();
  }, []);



  return (
    <HappinessTrackerContainer>
      <EmotionContainer>
        <img src={WorriedFace} alt="worried face" />
        <img src={StressedFace} alt="stressed face" />
        <img src={NeturalFace} alt="netural face" />
        <img src={ComfortableFace} alt="comfortable face" />
        <img src={HappyFace} alt="happy face" />
      </EmotionContainer>
      <BottomContainer>
        <h3>How are you feeling this week?</h3>
      </BottomContainer>
    </HappinessTrackerContainer>
  );
};

export default HappinessTracker;
