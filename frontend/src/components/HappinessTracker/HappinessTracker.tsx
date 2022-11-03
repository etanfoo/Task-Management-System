import { useState } from "react";
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
import { putProfileHappiness } from "../../api/profile";

/**
   STRESSED = 0;
   WORRIED = 1;
   NEUTRAL = 2;
   COMFORTABLE = 3;
   HAPPY = 4;
 */
export type HappinessValue = null | 0 | 1 | 2 | 3 | 4;

const HappinessTracker = () => {
  const [showHappinessTracker, setShowHappinessTracker] = useState(true);

  const handleClick = async (event: any) => {
    const happinessValue = event.target.id;

    const currentLoggedInProfileId = parseInt(
      sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!
    );
    try {
      await putProfileHappiness(currentLoggedInProfileId, happinessValue);
    } catch (err: any) {
      console.log(err);
    }
    setShowHappinessTracker(false);
  };

  return (
    <>
      {showHappinessTracker ? (
        <HappinessTrackerContainer>
          <EmotionContainer>
            <img
              src={WorriedFace}
              alt="worried face"
              id="0"
              onClick={handleClick}
            />
            <img
              src={StressedFace}
              alt="stressed face"
              id="1"
              onClick={handleClick}
            />
            <img
              src={NeturalFace}
              alt="netural face"
              id="2"
              onClick={handleClick}
            />
            <img
              src={ComfortableFace}
              alt="comfortable face"
              id="3"
              onClick={handleClick}
            />
            <img
              src={HappyFace}
              alt="happy face"
              id="4"
              onClick={handleClick}
            />
          </EmotionContainer>
          <BottomContainer>
            <h3>How are you feeling?</h3>
          </BottomContainer>
        </HappinessTrackerContainer>
      ) : (
        <BottomContainer>
          <h3>Thank you.</h3>
        </BottomContainer>
      )}
    </>
  );
};

export default HappinessTracker;
