import { InputField, RedirectLink, SignUpPageContainer } from "./style";
import Logo from "../../assets/COMP3900-Logo.png";
import { Button } from "@mui/material";
import { useState } from "react";
import { postSignUp } from "../../api/auth";

const SignUpPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

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
      // redirect to dashboard
    } catch (err: any) {
      // todo: show some error
    }
  };

  return (
    <>
      {/* todo: loading overlay */}
      {/* todo: error popup */}
      <SignUpPageContainer>
        <img src={Logo} alt='logo' style={{ height: '200px', width: '200px' }} />
        <h1 style={{ fontWeight: 'normal', width: '100%' }}>Sign up now</h1>
        <InputField 
          size='small'
          label='Full name'
          onChange={(e) => setName(e.target.value)}
        />
        <InputField
          size='small'
          label='Email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          size='small'
          type='password'
          label='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputField
          size='small'
          type='password'
          label='Confirm password'
          onChange={(e) => setConfirmedPassword(e.target.value)}
        />
        <span>
          Already have an account? &nbsp;
          <RedirectLink href='/login'>
            Sign in
          </RedirectLink>
        </span>
        <Button variant='contained'>
          Sign Up
        </Button>
      </SignUpPageContainer>
    </>
  );
};

export default SignUpPage;