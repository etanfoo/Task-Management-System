import { TextField } from "@mui/material";
import { styled } from "@mui/system";

export const SignUpPageContainer = styled('div')`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  align-items: center;
`;

export const InputField = styled(TextField)`
  width: 200%;
  margin-bottom: 1rem;
  align-self: center;
`;

export const RedirectLink = styled('a')`

  text-decoration: none;
  transition: all 0.3s ease 0s;
  &:hover {
  }
`;



