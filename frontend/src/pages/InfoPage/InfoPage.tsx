import Footer from "../../components/Footer/Footer";
import {
  BodyContainer,
  InfoPageContainer,
  StyledDivider,
  TierContainer,
} from "./style";
import BronzeIcon from "../../assets/bronze.png";
import SilverIcon from "../../assets/silver.png";
import GoldIcon from "../../assets/gold.png";
import DiamondIcon from "../../assets/diamond.png";

const InfoPage = () => {
  return (
    <InfoPageContainer>
      <BodyContainer>
        <h1>Perks</h1>
        <StyledDivider textAlign="left">
          The more tasks you complete, the more rewards you get!
        </StyledDivider>
        <TierContainer>
          <img src={DiamondIcon} alt="" />
          <h2>Diamond</h2>
        </TierContainer>
        <p>
          You've earned at least <b>400 points</b> from completed tasks and
          you're killing it! Keep up the amazing work but be sure to take breaks
          when needed.
        </p>
        <TierContainer>
          <img src={GoldIcon} alt="" />
          <h2>Gold</h2>
        </TierContainer>
        <p>
          You're breezing through your tasks and you've accumulated{" "}
          <b>300 points</b> from completed tasks! The more tasks you complete,
          the more rewards you get!
        </p>
        <TierContainer>
          <img src={SilverIcon} alt="" />
          <h2>Silver</h2>
        </TierContainer>
        <p>
          You've been rewarded <b>200 points</b> and making solid progress
          through your tasks!
        </p>
        <TierContainer>
          <img src={BronzeIcon} alt="" />
          <h2>Bronze</h2>
        </TierContainer>
        <p>
          Keep it up!. You've earned <b>100 points</b> and currently sitting in
          bronze!
        </p>
      </BodyContainer>
      <Footer />
    </InfoPageContainer>
  );
};

export default InfoPage;
