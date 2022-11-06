import { Avatar, Button, styled } from "@mui/material";
import { Palette } from "../../components/Palette";

export const TaskPageContainer = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  position: relative;
  padding-bottom: 3rem;
`;

export const BodyContainer = styled('div')`
  display: flex;
  flex-direction: row;
  padding-top: 1rem;
`;


export const MainContainer = styled('div')`
  height: 100%;
  width: 80%;
  padding: 0 4rem;

  // border: 2px solid ${Palette.gray};

  // > h1 {
  //   font-weight: normal;
  // };
`;

export const TaskContainer = styled('div')`
  // height: 100%;
  // width: 80%;
  padding: 0 2rem;

  border: 2px solid ${Palette.gray};

  > h1 {
    font-weight: normal;
    padding-top: 0rem;
  };

  > h3 {
    font-weight: normal;
  };
`;

export const DescriptionContainer = styled('div')`
  // height: 100%;
  // width: 80%;
  // Change??
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 1rem 2rem;
  
  border: 2px solid ${Palette.gray};

  > h1 {
    font-weight: normal;
    padding-top: 0rem;
  };
`;

export const TaskMembers = styled('div')`
  // // height: 100%;
  // // width: 80%;
  // // Change??
  // margin: 1rem;
  // padding: 0 2rem;
  
  // border: 2px solid ${Palette.gray};
  // text-align: center;
  > h3 {
    font-weight: normal;
    display: flex;
    flex-direction: row;
    
    > div {
      display: flex;
      align-items: center;
    }
  };
`;

export const UserAvatar = styled('img')`
  height: 2.5rem;
  margin-left: 1rem;
  margin-right: 1rem;
  border-radius: 5rem;
`;

export const StyledAvatar = styled(Avatar)`
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  background-color: ${Palette.mainTeal};
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
