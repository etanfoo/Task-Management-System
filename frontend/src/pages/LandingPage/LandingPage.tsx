import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { LandingPageFeatures, LandingPageInstructions } from "../../constants/landing-page-constants";
import FeatureCard from "./FeatureCard/FeatureCard";
import InstructionCard from "./InstructionCard/InstructionCard";
import { FeaturesContainer, GetStartedButton, GridContainer, InstructionsContainer, LandingPageContainer, StatsContainer, StatsGridContainer } from "./style";
import { useInView } from "react-intersection-observer";
import Counter from "../../components/Counter/Counter";

const LandingPage = () => {
  const { ref, inView } = useInView();

  return (
    <LandingPageContainer>
      <Header />
      <h1>
        Manage your project and tasks with&nbsp;
        <span>
          TaskHub
        </span>
      </h1>
      <h3>
        Everything you need to get the job done.
      </h3>
      <GetStartedButton variant="contained">
        Get Started&nbsp;
        <span>
          →
        </span>
      </GetStartedButton>
      <FeaturesContainer>
        <h2>Why&nbsp;<span>TaskHub?</span></h2>
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
        <p>We're dedicated to improving the experience and performance of Chakra UI.</p>
        <StatsGridContainer>
            <Counter
              innerRef={ref}
              finalValue={200}
              trigger={inView}
            />
            <Counter
              innerRef={ref}
              finalValue={200}
              trigger={inView}
            />
            <Counter
              innerRef={ref}
              finalValue={200}
              trigger={inView}
            />
            <Counter
              innerRef={ref}
              finalValue={200}
              trigger={inView}
            />
        </StatsGridContainer>
      </StatsContainer>
      <h2>How it works</h2>
      <InstructionsContainer>
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