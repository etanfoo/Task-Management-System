import { Avatar, Button, Select, Slider, styled } from "@mui/material";
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

  border: 1px solid ${Palette.gray};
  // > h2 {
  //   font-weight: normal;
  //   // text-align: center;
  // };
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
  padding: 1rem;
  
  border: 1px solid ${Palette.gray};
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
  margin-right: 0.5rem;
  border-radius: 5rem;
  // margin-top: 0.5rem;
`;

export const UserAvatarEdit = styled('img')`
  height: 2.5rem;
  margin-right: 0.5rem;
  border-radius: 5rem;
  margin-top: 0.5rem;
`;

export const StyledAvatar = styled(Avatar)`
  margin-right: 0.5rem;
  margin-left: 0.75rem;
  margin-top: 0.5rem;
  background-color: ${Palette.mainTeal};
`;

// export const StyledSelect = styled(Select)`
//   height: 60px;
//   margin-left: 0.5rem;
// `;

export const UserCard = styled('div')`
  display: flex;
  > h3 {
    font-weight: normal;
    // margin-top: 0.2rem;
    margin-left: 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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

export const IconContainerView = styled('div')`
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

export const IconContainerEdit = styled('div')`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  align-self: flex-start;
  margin-top: 0.5rem;

  > :first-of-type {
    margin-right: 1rem;
  };

  > img {
    height: 1.5rem;
    width: 1.5rem;
    cursor: pointer;
  };
`;

export const TopContainer = styled('div')`
  display: flex;
  flex-direction: column;
`;

export const TitleContainerView = styled('div')`
  display: flex;
  // flex-direction: column;
  // margin-top: 1rem;
  > h1 {
    font-weight: normal;
    padding-top: 0rem;
    margin-bottom: 0.5rem;
  };

  h3 {
    font-weight: normal;
    margin-left: 1rem;
  };
`;

export const ProjectLink = styled('h1')`
  padding-top: 0rem;
  font-weight: normal;
  color: #3a86ff;
  padding: 0.5rem;
  border-radius: 1rem;
  // margin-right: 0.5rem;
  // text-decoration: underline;
  background-color: ${Palette.lightGray}
`;

export const TitleContainerEdit = styled('div')`
  display: flex;
  // flex-direction: column;
  margin-top: 1rem;

  h3 {
    font-weight: normal;
    margin-left: 1.5rem;
    margin-right: 0.5rem;
  };
`;

export const DeadlineContainer = styled('div')`
  display: flex;
  // flex-direction: column;
  > h3 {
    font-weight: normal;
    margin-right: 0.5rem;
  };
`;

export const StyledSlider = styled(Slider)`
  margin-top: 1.2rem;
  margin-left: 1rem;
`;
