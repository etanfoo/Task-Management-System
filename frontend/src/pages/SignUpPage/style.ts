import { Button, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import { Palette } from "../../components/Palette";

export const SignUpPageContainer = styled('div')`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  align-items: center;

  > img {
    height: 12.5rem;
    width: 12.5rem;
    cursor: pointer;
  };

  > h1 {
    font-weight: normal;
    width: 100%;
  };
`;

export const InputField = styled(TextField)`
  width: 200%;
  margin-bottom: 1rem;
  align-self: center;
`;

export const RedirectLink = styled(Link)`
  color: ${Palette.mainTeal};
  text-decoration: none;
  transition: all 0.1s ease 0s;
  &:hover {
    font-weight: bold;
  }
`;

export const StyledButton = styled(Button)`
  background-color: ${Palette.mainTeal};
  margin-top: 1rem;

  &:hover {
    background-color: ${Palette.darkTeal};
  }
`;

