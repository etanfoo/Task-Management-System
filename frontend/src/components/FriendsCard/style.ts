import { Avatar } from "@mui/material";
import { styled } from "@mui/system";
import { Palette } from "../Palette";

export const FriendsCardContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 1rem;
  margin-bottom: 1rem;

  transition: transform .2s;
  &:hover {
    transform: scale(1.05);
  }

  > img {
    width: 3.125rem; 
    height: 3.125rem;
    margin-right: 1rem;
    border-radius: 5rem;
  };
`;

export const FriendsCardEditContainer = styled('div')`
  display: flex;
  cursor: pointer;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 1rem;
`;

export const ProfileContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: transform .2s;

  &:hover {
    transform: scale(1.05);
  }
`;


export const UserAvatar = styled('img')`
  width: 3.125rem;  
  height: 3.125rem;
  margin-right: 1rem;
  border-radius: 5rem;
`;

export const DeleteButton = styled('img')`
  height: 1rem;
  margin-left: auto; 
  margin-right: 0;
  margin-top: 1rem;
  
  &:hover {
    transform: scale(1.25);
  }
`;

export const StyledAvatar = styled(Avatar)`
  margin-right: 1rem;
  background-color: ${Palette.mainTeal};
`;

export const DetailsContainer = styled('div')`
  display: flex;
  flex-direction: column;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
    
  > h3 {
    margin: 0;
    font-weight: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  };

  > p {
    margin: 0;
    color: ${Palette.thGray}
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  };
`;