import { Button, FormControl, styled, TextField } from "@mui/material";
import { Palette } from "../../components/Palette";

export const ProjectPageContainer = styled('div')`
  display: flex;
  position: relative;
  min-height: 100vh;
  padding-bottom: 3rem;
`;

export const ProjectContainer = styled('div')`
  width: 80%;
  margin-left: 2rem; 

  > div {
    display: flex;
    width: 90%
  };  
`;

export const PP = styled('div')`
  display: flex;
`;

export const TopContainer = styled('div')`
  > h1 {
    font-weight: normal;
  };
`;

export const IconContainer = styled('div')`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  align-self: flex-start;
  margin-top: 2rem;

  > :first-of-type {
    margin-right: 1rem;
  };

  > img {
    height: 1.5rem;
    width: 1.5rem;
    cursor: pointer;
  };
`;

export const MidContainer = styled('div')`
  display: flex;
  flex-direction: column;
  width: 65%;
`;

export const SummaryContainer = styled('div')`
  padding: 1rem;
  height: 13rem;
  border-radius: 0.5rem;
  overflow: auto;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  
  > p {
    padding: 1rem;
    padding-bottom: 0;
    margin-top: 0;
    margin-bottom: 0;
  };

  > TextField {
    width: 100%;
  };
`;


export const FriendsContainer = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 35%;
  border-radius: 0.5rem;
  margin-left: 2rem;
  height: 36rem;

  > p {
    text-align: center;
    margin-top: 4rem;
    color: ${Palette.thGray};
  };
`;

export const MembersSearchbar = styled(TextField)`
  display: flex;
  margin-left: 1rem;
  margin-bottom: 1rem;
  margin-right: 2rem;
  width: 23rem;
`;

export const OverflowContainer = styled('div')`
  overflow-y: auto;
  padding: 0 1rem;
`;

export const BottomContainer = styled('div')`
  margin-top: 3rem;
  flex-direction: column;
`;

export const TaskControls = styled('div')`
  display: flex;
`;

export const TaskSearchbar = styled(TextField)`
  display: flex;
  margin-bottom: 1rem;
  margin-right: 2rem;
  width: 90%;
`;

export const TaskSort = styled(FormControl)`
  width: 15%;
  text-align: left;
`;

export const TasksContainer = styled('div')`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
  height: 250px;
  padding: 1.5rem;
  text-align: left;
`;

export const LabelContainer = styled('div')`
  display: flex;
  flex-direction: row;
  padding: 0 2rem;

  > :first-of-type {
    width: 10%;
  };

  > :nth-of-type(2) {
    width: 50%;
  };

  > :nth-of-type(3) {
    width: 20%
  };
  
  > :nth-of-type(4) {
    width: 23%;
  };
`;

export const CancelButton = styled(Button)`
  text-transform: capitalize;
  background-color: white;
  color: black;
  font-size: 1rem;

  &:hover {
    background-color: ${Palette.lightGray};
  };
`;

export const UpdateButton = styled(Button)`
  text-transform: capitalize;
  background-color: ${Palette.mainTeal};
  font-size: 1rem;

  &:hover {
    background-color: ${Palette.darkTeal};
  };
`;

export const EmptySummary= styled('div')`
  color: ${Palette.thGray};
`;