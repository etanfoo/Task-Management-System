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

/**
   NONE = 0;
   STRESSED = 1;
   WORRIED = 2;
   NEUTRAL = 3;
   COMFORTABLE = 4;
   HAPPY = 5;
 */
export type HappinessValue = 0 | 1 | 2 | 3 | 4 | 5;

const HappinessTracker = () => {
  const [currentLoggedInProfile, setCurrentLoggedInProfile] =
    useState<IProfile>(EmptyProfile);
  const [showHappinessTracker, setShowHappinessTracker] = useState(true);

  const handleClick = async (event: any) => {
    const happinessValue = event.target.id;

    try {
      await putProfileHappiness(currentLoggedInProfile.id, happinessValue);
    } catch (err: any) {
      console.log(err);
    }
    setShowHappinessTracker(false);
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
    <>
      {showHappinessTracker ? (
        <HappinessTrackerContainer>
          <EmotionContainer>
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
            <img
              src={HappyFace}
              alt="happy face"
              id="5"
              onClick={handleClick}
            />
          </EmotionContainer>
          <BottomContainer>
            <h3>How are you feeling?</h3>
          </BottomContainer>
        </HappinessTrackerContainer>
      ) :
      
          <BottomContainer>
      <h3>Thank you.</h3>
      </BottomContainer>
      }
    </>
  );
};

export default HappinessTracker;
