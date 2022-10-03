import { LoginPageContainer, LoginPageIcon, LoginPageTitle } from "./style";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import TaskHubIcon from "../../assets/COMP3900-Logo.png";
// import { postLogin } from "../../api/auth";
// import { useState } from 'react';

const LoginPage = () => {
  // const [email, setEmail] = useState<string>("");
  // const [password, setPassword] = useState<string>("");
  return (
    <LoginPageContainer>
      <Stack spacing={2} direction="column">
        <LoginPageIcon>
          <img src={TaskHubIcon} alt="TaskHub logo" width="250" height="250"/>
        </LoginPageIcon>
        <LoginPageTitle>Login to TaskHub</LoginPageTitle>
        <TextField
          id="login-email"
          placeholder="Email"
          // onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="login-password"
          placeholder="Password"
          // onChange={(e) => setEmail(e.target.value)}
        />
      </Stack>
      New to TaskHub? 
      <Link to="/signup">Sign up</Link>
      
      <Button variant="contained">Login</Button>
    </LoginPageContainer>
  )
};

export default LoginPage;