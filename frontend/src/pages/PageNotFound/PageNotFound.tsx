import { PageNotFoundContainer, RedirectLink } from "./style";
import Logo from "../../assets/logo.png";
import Footer from "../../components/Footer/Footer";

const PageNotFound = () => {
  const isAuthorised = sessionStorage.getItem(process.env.REACT_APP_TOKEN!);

  return (
    <>
      <PageNotFoundContainer>
        <img src={Logo} alt='logo' />
        <h1>looks like something went wrong</h1>
        <h1>
          click&nbsp;
          <RedirectLink to={ isAuthorised ? '/dashboard' : '/' }>
            here       
          </RedirectLink>
          &nbsp;to return to our home page
        </h1>
      </PageNotFoundContainer>
      <Footer />
    </>
  );
};

export default PageNotFound;