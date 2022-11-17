import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import {
  LandingPageFeatures,
  LandingPageInstructions,
  LandingPageStats,
} from "../../constants/landing-page-constants";
import FeatureCard from "./FeatureCard/FeatureCard";
import InstructionCard from "./InstructionCard/InstructionCard";
import {
  FeaturesContainer,
  GetStartedButton,
  GridContainer,
  InstructionsContainer,
  LandingPageContainer,
  StatsContainer,
  StatsGridContainer,
} from "./style";
import { useInView } from "react-intersection-observer";
import Counter from "../../components/Counter/Counter";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const navigate = useNavigate();

  return (
    <LandingPageContainer>
      <Header />
      <h1>
        Manage your project and tasks with&nbsp;
        <span>TaskHub</span>
      </h1>
      <h3>Everything you need to get the job done.</h3>
      <GetStartedButton variant="contained" onClick={() => navigate("/signup")}>
        Get Started&nbsp;
        <span>→</span>
      </GetStartedButton>
      <FeaturesContainer>
        <h2>
          Why&nbsp;<span>TaskHub?</span>
        </h2>
        <GridContainer>
          {LandingPageFeatures.map((feature) => (
            <FeatureCard
              key={feature.title}
              imageUrl={feature.imageUrl}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </GridContainer>
      </FeaturesContainer>
      <StatsContainer>
        <h2>TaskHub is growing quickly</h2>
        <p>Our results speak for themselves.</p>
        <StatsGridContainer>
          {LandingPageStats.map((stat) => (
            <Counter
              key={stat.description}
              stat={stat.description}
              finalValue={stat.number}
              innerRef={ref}
              inView={inView}
            />
          ))}
        </StatsGridContainer>
      </StatsContainer>
      <InstructionsContainer>
        <h2>How it works</h2>
        {LandingPageInstructions.map((instruction, index) => (
          <InstructionCard
            key={index}
            imageUrl={instruction.imageUrl}
            title={instruction.title}
            description={instruction.description}
            index={index}
          />
        ))}
      </InstructionsContainer>
      <Footer />
    </LandingPageContainer>
  );
};

export default LandingPage;
