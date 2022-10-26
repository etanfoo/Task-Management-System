import { Button, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { Palette } from "../../components/Palette";

export const CreateProjectPageContainer = styled('div')`
  display: flex;
  flex-direction: column;
  text-align: left;
  align-items: center;
`;

export const TopContainer = styled('div')`
  width: 80%;
  
  > h1 {
    font-weight: normal;
    border-bottom: 2px solid ${Palette.thGray};
  };
  
  > h2 {
    font-weight: normal;
    margin-bottom: 10px;
  };
`;

export const BottomContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: space-between;
  width: 80%;
`;

export const SummaryContainer = styled('div')`
  width: 100%;
  
  
  > h2 {
    margin-top: 1rem;
    font-weight: normal;
  };

  > TextField {
    background-color: ${Palette.mainTeal};
    color: white;
  }
`;

export const OverflowContainer = styled('div')`
  overflow-y: auto;
  padding: 0 1rem;
  
  > p {
    text-align: center;
    margin-top: 7rem;
    color: ${Palette.thGray};
  }
`;

export const MembersSearchbar = styled(TextField)`
  display: flex;
  margin-left: 1rem;
  margin-bottom: 1rem;
  margin-right: 2rem;
`;

export const MembersContainer = styled('div')`
  width: 100%;  
  
  > h2 {
    margin-top: 1rem;
    font-weight: normal;
  };
`;

export const FriendsContainer = styled('div')`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 1rem;;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 100%;
  border-radius: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 3rem;
  height: 355px;
`;

export const ControlContainer = styled('div')`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  margin-right: 10vw;
  align-self: flex-start;

  > :first-of-type {
    margin-right: 1rem;
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

export const CreateButton = styled(Button)`
  text-transform: capitalize;
  background-color: ${Palette.mainTeal};
  font-size: 1rem;

  &:hover {
    background-color: ${Palette.darkTeal};
  }
`;