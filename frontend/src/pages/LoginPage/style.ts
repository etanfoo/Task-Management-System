import { styled } from "@mui/system";
import { Palette } from "../../components/Palette";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

export const LoginPageContainer = styled('div')`
  width: 30%;  
  position: absolute;
  left: 50%;
  top: 5%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%)
`;

export const LoginPageIcon = styled('div')`
  margin: auto;
  margin-top: 20%;
  cursor: pointer;
`;

export const LoginPageTitle = styled('h1')`
  text-align: center;
  font-weight: normal;
`;

export const NewUser = styled('span')`
  float: right;
  margin-top: 2%;
`;
export const SignupButton = styled(Link)`
  color: ${Palette.mainTeal};
  text-decoration: none;
  transition: all 0.1s ease 0s;

  &:hover {
    font-weight: bold;
  }
`;

export const LoginPageButton = styled(Button)`
  position: relative;
  left: 40%;
  margin-top: 11%;
  background-color: ${Palette.mainTeal};
  
  &:hover {
    background-color: ${Palette.darkTeal};
  }
`;
