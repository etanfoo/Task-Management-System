import { styled } from "@mui/material";
import { Palette } from "../../components/Palette";

export const TaskPageContainer = styled('div')`
  display: flex;
  flex-direction: column;
  // width: 100%;
  height: 100%;
  min-height: 100vh;
  position: relative;
  padding-bottom: 3rem;
  // text-align: center;
`;

export const BodyContainer = styled('div')`
  display: flex;
  flex-direction: row;
  padding-top: 1rem;
`;


export const MainContainer = styled('div')`
  // height: 100%;
  width: 80%;
  // margin: auto;
  // padding: 0 4rem;
  border: 1px solid ${Palette.gray};
  
  > h1 {
    font-weight: normal;
  };
`;


