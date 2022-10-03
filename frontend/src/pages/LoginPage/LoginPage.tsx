import { LoginPageContainer, LoginPageIcon, LoginPageTitle, NewUser, LoginPageButton } from "./style";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";
import TaskHubIcon from "../../assets/COMP3900-Logo.png";
import { postLogin } from "../../api/auth";
import { useState } from 'react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const login = async () => {
    const data = await postLogin(email, password);
    console.log(data);
    navigate('/home');
  }

  return (
    <LoginPageContainer>
      <Stack spacing={1} direction="column">
        <LoginPageIcon>
          <img src={TaskHubIcon} alt="TaskHub logo" width="250" height="250"/>
        </LoginPageIcon>
        <LoginPageTitle>Login to TaskHub</LoginPageTitle>
        <TextField
          id="login-email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="login-password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        
      </Stack>
      <NewUser>
        New to TaskHub? &nbsp;
        <Link to="/signup">Sign up</Link>
      </NewUser>
      <LoginPageButton>
        <Button variant="contained" onClick={login}>Login</Button>
      </LoginPageButton>
    </LoginPageContainer>
  )
};

export default LoginPage;