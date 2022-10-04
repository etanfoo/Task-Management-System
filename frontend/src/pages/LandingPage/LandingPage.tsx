import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { LandingPageFeatures } from "../../constants/LandingPageFeatures";
import FeatureCard from "./FeatureCard/FeatureCard";
import { FeaturesContainer, GetStartedButton, GridContainer, LandingPageContainer } from "./style";

const LandingPage = () => {
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
              imageUrl={feature.imageUrl}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </GridContainer>
      </FeaturesContainer>
      <Footer />
    </LandingPageContainer>
  );
};

export default LandingPage;