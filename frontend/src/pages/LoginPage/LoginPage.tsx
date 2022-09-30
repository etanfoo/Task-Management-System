import { LoginPageContainer, LoginPageIcon, LoginPageTitle } from "./style";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import TaskHubIcon from "../../assets/COMP3900-Logo.png";

const LoginPage = () => {
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
        />
        <TextField
          id="login-password"
          placeholder="Password"
        />
      </Stack>
      New to TaskHub? 
      <Link to="/signup">Sign up</Link>
      <Button variant="contained">Login</Button>
    </LoginPageContainer>
  )
};

export default LoginPage;