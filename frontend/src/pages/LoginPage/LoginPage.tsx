import {
  LoginPageContainer,
  LoginPageIcon,
  LoginPageTitle,
  NewUser,
  LoginPageButton,
  SignupButton,
} from "./style";
import { TextField, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TaskHubIcon from "../../assets/logo.png";
import { postLogin } from "../../api/auth";
import { useState } from "react";
import Popup from "../../components/Popup/Popup";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async () => {
    setIsLoading(true);

    if (email === "" || password === "") {
      setError("All fields must be filled.");
      return;
    }

    try {
      const resp = await postLogin(email, password);
      sessionStorage.setItem(process.env.REACT_APP_TOKEN!, resp.access_token);
      sessionStorage.setItem(
        process.env.REACT_APP_PROFILE_ID!,
        resp.profile_id.toString()
      );
      sessionStorage.setItem("showHappinessTracker", "true");
      setIsLoading(false);
      navigate("/dashboard", { state: { initialPageState: "tasks" } });
    } catch (err: any) {
      setIsLoading(false);
      if (err.response.status === 401) setError("Incorrect email or password");
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
      {isLoading ? (
        <LoadingOverlay isOpen={isLoading} />
      ) : (
        <LoginPageContainer>
          <Stack spacing={2} direction="column">
            <LoginPageIcon onClick={() => navigate("/")}>
              <img
                src={TaskHubIcon}
                alt="TaskHub logo"
                width="250"
                height="250"
              />
            </LoginPageIcon>
            <LoginPageTitle>Login to TaskHub</LoginPageTitle>
            <TextField
              id="login-email"
              label="Email"
              error={error !== ""}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="login-password"
              type="password"
              label="Password"
              error={error !== ""}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Stack>
          <NewUser>
            New to TaskHub? &nbsp;
            <SignupButton to="/signup">Sign up</SignupButton>
          </NewUser>
          <LoginPageButton variant="contained" onClick={login}>
            Login
          </LoginPageButton>
        </LoginPageContainer>
      )}
    </>
  );
};

export default LoginPage;
