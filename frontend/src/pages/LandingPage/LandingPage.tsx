import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Palette } from "../../components/Palette";
import { LandingPageFeatures, LandingPageInstructions } from "../../constants/landing-page-constants";
import FeatureCard from "./FeatureCard/FeatureCard";
import InstructionCard from "./InstructionCard/InstructionCard";
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
      <div style={{ width: '100%', backgroundColor: Palette.mainTeal, color: 'white', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ fontWeight: 'normal', fontSize: '2.5rem', marginBottom: '0' }}>TaskHub is growing quickly</h2>
        <p>We're dedicated to improving the experience and performance of Chakra UI.</p>
        <div style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '2rem' }}>
            <div style={{ textAlign: 'left', margin: '0', fontSize: '3rem', borderLeft: '1px solid white', padding: '0 0 0 1rem' }}>
              asdasd
            </div>
            <div style={{ textAlign: 'left', margin: '0', fontSize: '3rem', borderLeft: '1px solid white', padding: '0 0 0 1rem' }}>
              asdasd
            </div>
            <div style={{ textAlign: 'left', margin: '0', fontSize: '3rem', borderLeft: '1px solid white', padding: '0 0 0 1rem' }}>
              asdasd
            </div>
            <div style={{ textAlign: 'left', margin: '0', fontSize: '3rem', borderLeft: '1px solid white', padding: '0 0 0 1rem' }}>
              asdasd
            </div>
        </div>
      </div>
      <h2>How it works</h2>
      <div style={{ padding: '0 10rem', width: '100%', display: 'flex', flexDirection: 'column' }}>
        {LandingPageInstructions.map((instruction, index) => (
          <InstructionCard
            imageUrl={instruction.imageUrl}
            title={instruction.title}
            description={instruction.description}
            index={index}
          />
        ))}
      </div>
      <Footer />
    </LandingPageContainer>
  );
};

export default LandingPage;