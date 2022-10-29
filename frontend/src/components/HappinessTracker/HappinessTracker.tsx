import { BottomContainer, EmotionContainer, HappinessTrackerContainer } from "./style";
import HappyFace from "./../../assets/happy_face.png"
import ComfortableFace from "./../../assets/comfortable_face.png"
import NeturalFace from "./../../assets/netural_face.png"
import WorriedFace from "./../../assets/worried_face.png"
import StressedFace from "./../../assets/stressed_face.png"

const HappinessTracker = () => {
  return(
    <HappinessTrackerContainer>
      <EmotionContainer>
        <img src={HappyFace} alt='user avatar' />
        <img src={ComfortableFace} alt='user avatar' />
        <img src={NeturalFace} alt='user avatar' />
        <img src={WorriedFace} alt='user avatar' />
        <img src={StressedFace} alt='user avatar' />
      </EmotionContainer>
      <BottomContainer>
        <h3>How are you feeling this week?</h3>
      </BottomContainer>
    </HappinessTrackerContainer>
  )
}

export default HappinessTracker;