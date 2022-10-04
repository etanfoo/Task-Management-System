import { Button } from "@mui/material";
import { styled } from "@mui/system";
import { Palette } from "../Palette";

export const HeaderContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 0 2rem;
  height: 5rem;
  margin-bottom: 1rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const Logo = styled('img')`
  height: 4rem;
  cursor: pointer;
`;

export const SignUpButton = styled(Button)`
  text-transform: capitalize;
  background-color: ${Palette.mainTeal};
  &:hover {
    background-color: ${Palette.darkTeal};
  }
`;

export const LoginLink = styled('a')`
  margin: 0 1.5rem 0 auto;
  text-decoration: none;
  color: black;
  font-size: 1rem;
  transition: all 0.3s ease 0s;
  &:hover {
    color: ${Palette.mainTeal};
  }
`;
