import { Avatar, Button, styled } from "@mui/material";
import { Palette } from "../Palette";

export const ModalContainer = styled("div")`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 70%;
  height: 85%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const EmptyModal = styled("div")`
  margin: auto;
  > h1 {
    font-weight: normal;
  }
`;

export const ModalBody = styled("div")`
  width: 90%;
  margin-inline: auto;

  > h1,
  h2 {
    font-weight: normal;
    margin-bottom: 0.5rem;
  }
`;

export const BottomContainer = styled("div")`
  display: flex;
  flex-direction: row;
  > :first-of-type {
    width: 30%;
    margin-right: 5%;
  }
  > :nth-of-type(2) {
    width: 30%;
    margin-right: 5%;
  }
  > :nth-of-type(3) {
    width: 30%;
  }
`;

export const ButtonsContainer = styled("div")`
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 2rem;
  right: 2rem;

  > :first-of-type {
    margin-right: 1.5rem;
  }
`;

export const CancelButton = styled(Button)`
  text-transform: capitalize;
  background-color: white;
  color: black;
  font-size: 1rem;

  &:hover {
    background-color: ${Palette.lightGray};
  }
`;

export const CreateButton = styled(Button)`
  text-transform: capitalize;
  background-color: ${Palette.mainTeal};
  font-size: 1rem;

  &:hover {
    background-color: ${Palette.darkTeal};
  }
`;

export const StyledAvatar = styled(Avatar)`
  height: 3rem;
  width: 3rem;
  background-color: ${Palette.mainTeal};
  cursor: pointer;
`;

export const UserCard = styled("div")`
  display: flex;
  > h3 {
    font-weight: normal;
    margin-top: 0.6rem;
    margin-left: 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
