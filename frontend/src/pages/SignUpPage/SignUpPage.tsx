import { InputField, RedirectLink, SignUpPageContainer, StyledButton } from "./style";
import Logo from "../../assets/COMP3900-Logo.png";
import { useState } from "react";
import { postSignUp } from "../../api/auth";
import Popup from "../../components/Popup/Popup";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const signUp = async () => {
    if (email === "" || name === "" || password === "") {
      setError("All fields must be filled.");
      return;
    } else if (password !== confirmedPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const token = await postSignUp(name, email, password);
      sessionStorage.setItem(process.env.REACT_APP_TOKEN!, token);
      navigate('/dashboard');
    } catch (err: any) {
      // TODO: check if error messages are being sent back as well
      setError("A network error has occurred. Please try again.");
    }
  };

  return (
    <>
      <Popup
        isOpen={error !== ""}
        popupMessage={error}
        handleClose={() => setError("")}
        type="error"
      />
      {/* todo: loading overlay? */}
      <SignUpPageContainer>
        <img src={Logo} alt='logo' style={{ height: '200px', width: '200px' }} />
        <h1 style={{ fontWeight: 'normal', width: '100%' }}>Sign up now</h1>
        <InputField 
          label='Full name'
          error={error !== ""}
          onChange={(e) => setName(e.target.value)}
        />
        <InputField
          label='Email'
          error={error !== ""}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          type='password'
          label='Password'
          error={error !== ""}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputField
          type='password'
          label='Confirm password'
          error={error !== ""}
          onChange={(e) => setConfirmedPassword(e.target.value)}
        />
        <span>
          Already have an account? &nbsp;
          <RedirectLink to='/login'>
            Sign in
          </RedirectLink>
        </span>
        <StyledButton variant='contained' onClick={signUp}>
          Sign Up
        </StyledButton>
      </SignUpPageContainer>
    </>
  );
};

export default SignUpPage;