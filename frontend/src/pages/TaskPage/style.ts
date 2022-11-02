import { styled } from "@mui/material";
import { Palette } from "../../components/Palette";

export const TaskPageContainer = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  // height: 100%;
  // min-height: 100vh;
  // position: relative;
  // padding-bottom: 3rem;
  text-align: center;
`;

export const LeftContainer = styled('div')`
  border-right: 1px solid ${Palette.gray};
  border-top: 1px solid ${Palette.gray};
  height: 85vh;
  width: 25rem;
  border-radius: 0.5rem;
  padding: 1rem;
`;

export const FriendsContainer = styled('div')`
  overflow-y: auto;
  padding: 0 1rem;
  height: 65%;
`;

