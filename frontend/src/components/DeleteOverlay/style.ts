import { Button } from "@mui/material";
import { styled } from "@mui/system";
import { Palette } from "../Palette";
// import { Palette } from "../Palette";

export const DeleteOverlayContainer = styled('div')`
  // margin: auto;
  width: 50%;
  height: 40%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 1rem;
  border-radius: 10px;
  > h1 {
    margin-top: 5rem;
    text-align: center;
    font-weight: normal;
  };
`;

export const ButtonsContainer = styled('div')`
  display: flex;
  width: 10%;
  position: absolute;
  top: 70%;
  left: 44%;
  transform: translate(-50%, -50%);
  // margin-right: 1rem;
  > :first-of-type {
    margin-right: 2rem;
  };
`;

export const NoButton = styled(Button)`
  background-color: white;
  color: black;
  font-size: 1rem;
  &:hover {
    background-color: ${Palette.lightGray};
  }
`;

export const YesButton = styled(Button)`
  // position: relative;
  // left: 40%;
  // margin-top: 11%;
  background-color: ${Palette.mainTeal};
  &:hover {
    background-color: ${Palette.darkTeal};
  }
`;