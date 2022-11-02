import { FormControl, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { Palette } from "../../components/Palette";

export const DashboardPageContainer = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  position: relative;
  padding-bottom: 3rem;
  text-align: center;
`;

export const LeftContainer = styled('div')`
  border-right: 1px solid ${Palette.gray};
  border-top: 1px solid ${Palette.gray};
  height: 100vh;
  width: 25rem;
  border-radius: 0.5rem;
  padding: 1rem;

  > h2 {
    font-weight: normal;
  }
`;

export const FriendsContainer = styled('div')`
  overflow-y: auto;
  padding: 0 1rem;
  height: 65%;
`;

export const ImageContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  > img {
    width: 3.125rem;
    height: 3.125rem;
    cursor: pointer;

    transition: transform .2s;
    &:hover {
      transform: scale(1.10);
    };  
  }
`;

export const BodyContainer = styled('div')`
  display: flex;
  flex-direction: row;
  padding-top: 1rem;
`;

export const RightContainer = styled('div')`
  height: 100%;
  width: 80%;
  padding: 0 4rem;
`;

export const StyledTextField = styled(TextField)`
  margin-bottom: 2rem;
`;

export const SelectContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

export const StyledForm = styled(FormControl)`
  width: 15%;
  text-align: left;
`;

export const TasksContainer = styled('div')`
  display: flex;
  flex-direction: column;
  height: 65vh;
  border: 1px solid ${Palette.gray};
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 2rem;
  text-align: left;

  > p {
    margin: auto auto;
    color: ${Palette.thGray};
  }
`;

export const TasksLabelContainer = styled('div')`
  display: flex;
  flex-direction: row;
  padding: 0 3rem;

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

export const ProjectsLabelContainer = styled('div')`
  display: flex;
  flex-direction: row;
  padding: 0 3rem;
  justify-content: space-between;

  > :first-of-type {
    width: 20%;
  };
  > :nth-of-type(2) {
    width: 75%;
  };
`;

export const OverflowContainer = styled('div')`
  overflow-y: auto;
  padding: 0 2rem;
`;