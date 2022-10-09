import { styled } from "@mui/system";

export const ProfilePageContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  position: relative;
  padding-bottom: 3rem;
  text-align: center;
`;

export const TopContainer = styled('div')`
  display: flex;
  flex-direction: row;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
  padding: 1rem;
  width: 80%;
  align-items: center;
  margin-bottom: 2rem;
`;

export const DetailsContainer = styled('div')`
  display: flex;
  flex-direction: column;
  text-align: left;
  > h1 {
    font-weight: normal;
    margin-bottom: 0;
  };
`;

export const IconContainer = styled('div')`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  align-self: flex-start;
`;

export const BodyContainer = styled('div')`
  display: flex;
  flex-direction: row;
  width: 80%;
`;

export const LeftContainer = styled('div')`
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
`;

export const AboutMeContainer = styled('div')`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
  width: 750px;
  height: 175px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  overflow-y: auto;
  text-align: left;
`;

export const TasksContainer = styled('div')`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
  width: 750px;
  height: 300px;
  padding: 1.5rem;
  margin-bottom: 3rem;
  text-align: left;

  > h2 {
    margin-top: 0;
    margin-left: 1rem;
    font-weight: normal;
  };
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

export const OverflowContainer = styled('div')`
  overflow-y: auto;
  padding: 0 1rem;
`;

export const FriendsContainer = styled('div')`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 1rem;;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 100%;
  border-radius: 0.5rem;
  margin-bottom: 3rem;
  height: 491px;

  > h2 {
    margin-top: 0;
    margin-left: 1rem;
    font-weight: normal;
  };
`;