import { FooterContainer } from "./style";

const Footer = () => {
  return (
    <FooterContainer>© TaskHub {new Date().getFullYear()}</FooterContainer>
  );
};

export default Footer;
