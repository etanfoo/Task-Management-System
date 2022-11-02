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
import { getProfile, putProfileHappiness } from "../../api/profile";
import { IProfile } from "../../interfaces/api-response";
import { EmptyProfile } from "../../constants/profiles";
import { ExitButton } from "./style";

export type HappinessValue = 0 | 1 | 2 | 3 | 4 | 5;

// TODO: deal with hiding happiness tracker
const HappinessTracker = () => {
  const STRESSED = 1;
  const WORRIED = 2;
  const NEUTRAL = 3;
  const COMFORTABLE = 4;
  const HAPPY = 5;

  const [currentLoggedInProfile, setCurrentLoggedInProfile] =
    useState<IProfile>(EmptyProfile);

  const handleClick = async (event: any) => {
    const happinessValue = event.target.id;
    console.log(happinessValue)

    // TODO: send api request
    try {
      await putProfileHappiness(
        currentLoggedInProfile.id, happinessValue
      );
    } catch (err: any) {
      console.log(err);
    }
  };

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
        <ExitButton variant="contained" onClick={handleClick} id="0">
          X
        </ExitButton>
        <img
          src={WorriedFace}
          alt="worried face"
          id="1"
          onClick={handleClick}
        />
        <img
          src={StressedFace}
          alt="stressed face"
          id="2"
          onClick={handleClick}
        />
        <img
          src={NeturalFace}
          alt="netural face"
          id="3"
          onClick={handleClick}
        />
        <img
          src={ComfortableFace}
          alt="comfortable face"
          id="4"
          onClick={handleClick}
        />
        <img src={HappyFace} alt="happy face" id="5" onClick={handleClick} />
      </EmotionContainer>
      <BottomContainer>
        <h3>How are you feeling?</h3>
      </BottomContainer>
    </HappinessTrackerContainer>
  );
};

export default HappinessTracker;
