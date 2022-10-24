import { Button, FormControl, styled, TextField } from "@mui/material";
import { Palette } from "../../components/Palette";

export const ProjectPageContainer = styled('div')`
  display: flex;
  // flex-direction: space-between;
`;

export const ProjectContainer = styled('div')`
  // display: flex;
  // margin: auto;
  // flex-direction: row;
  width: 80%;
  margin-left: 2rem;  
  > div {
    // margin-top: 0;
    // margin-left: 1rem;
    // font-weight: normal;
    display: flex;
    width: 90%
  };  
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
  // justify-content: space-around;
  // align-items: center;
  // flex-direction: row;
  // flex-wrap: wrap;
  // width: 10%;
`;

export const SummaryContainer = styled('div')`
  // display: flex;
  width: 80rem;
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
  }
`;


export const FriendsContainer = styled('div')`
  display: flex;
  flex-direction: column;
  // text-align: left;
  padding: 1rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 40%;
  border-radius: 0.5rem;
  // margin-top: 0;
  // margin-bottom: 2rem;
  margin-left: 2rem;
  height: 13rem;
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
  // width: 100%;
  // display: flex;
  // flex-direction: row;
  margin-top: 3rem;
  flex-direction: column;
`;

export const TaskControls = styled('div')`
  display: flex;
`;

export const TaskSearchbar = styled(TextField)`
  display: flex;
  // margin-left: 1rem;
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
  // margin-bottom: 3rem;
  text-align: left;
  // width: 50%;
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
    width: 20%;
  };
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

export const UpdateButton = styled(Button)`
  text-transform: capitalize;
  background-color: ${Palette.mainTeal};
  font-size: 1rem;

  &:hover {
    background-color: ${Palette.darkTeal};
  }
`;

export const EmptySummary= styled('div')`
  color: ${Palette.thGray}
`;