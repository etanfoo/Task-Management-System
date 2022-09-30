import { LoginPageContainer } from "./style";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <LoginPageContainer>
      Login to TaskHub
      <Stack spacing={2} direction="column">
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