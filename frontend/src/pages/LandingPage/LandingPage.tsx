import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Palette } from "../../components/Palette";
import { GetStartedButton, LandingPageContainer } from "./style";

const LandingPage = () => {
  return (
    <LandingPageContainer>
      <Header />
      <h1 style={{ fontSize: '3.5rem', width: '65%', marginBottom: '0', fontWeight: 'normal' }}>
        Manage your project and tasks with&nbsp;
        <span style={{ color: Palette.mainTeal }}>
          TaskHub
        </span>
      </h1>
      <h3 style={{ fontWeight: 'normal', color: 'gray', fontSize: '1.5rem' }}>
        Everything you need to get the job done.
      </h3>
      <GetStartedButton variant="contained">
        Get Started&nbsp;
        <span>
          →
        </span>
      </GetStartedButton>
      <h2 style={{ fontSize: '3rem', width: '65%', marginBottom: '0', marginTop: '3rem', fontWeight: 'normal' }}>
        Why&nbsp;
        <span style={{ color: Palette.mainTeal }}>
          TaskHub?
        </span>
      </h2>
      <Footer />
    </LandingPageContainer>
  );
};

export default LandingPage;