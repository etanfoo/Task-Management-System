import { InputField, RedirectLink, SignUpPageContainer, StyledButton } from "./style";
import Logo from "../../assets/COMP3900-Logo.png";
import { useState } from "react";
import { postLogin, postSignUp } from "../../api/auth";
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
      // ideally we would want the sign up route to pass in the access token
      // but currently unavailable - instead login api route is called soon after
      await postSignUp(name, email, password);
      const data = await postLogin(email, password);
      // todo: may want to extract this out to redux?
      sessionStorage.setItem(process.env.REACT_APP_PROFILE_ID!, data.profile_id.toString());
      sessionStorage.setItem(process.env.REACT_APP_TOKEN!, data.access_token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(
        err.response.data
          ? err.response.data.message
          : "A network error has occurred. Please try again."
      );
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
        <img src={Logo} alt='logo' onClick={() => navigate('/')} />
        <h1>Sign up now</h1>
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