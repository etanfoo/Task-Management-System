import { Avatar, Button } from "@mui/material";
import { styled } from "@mui/system";
import { Palette } from "../../components/Palette";

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

type TopContainerProps = {
  borderColor?: string;
};

export const TopContainer = styled('div')<TopContainerProps>`
  display: flex;
  flex-direction: row;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
  padding: 1rem 0.5rem 1rem 0.25rem;
  width: 80%;
  align-items: center;
  margin-bottom: 2rem;
  overflow: hidden;
  position: relative;

  // if borderColor is provided show border animation
  ${(props: TopContainerProps) => (props.borderColor) && `
    &:before {
      content: "";
      background-image: conic-gradient(
        ${props.borderColor} 100deg, transparent 120deg
      );
      z-index: -2;
      left: -25%;
      width: 150%;
      height: 100%;
      position: absolute;
      animation: rotate 5s linear infinite;
    }

    &:after {
      position: absolute;
      width: 99.25%;
      height: 95%;
      border-radius: 0.5rem;
      background: white;
      z-index: -1;
      content: "";
    }

    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }
  `}

  > img {
    margin-left: 1rem;
    width: 6.25rem;
    height: 6.25rem;
    margin-right: 1rem;
    border-radius: 5rem;
  };
`;

export const StyledAvatar = styled(Avatar)`
  margin-left: 1rem;
  margin-right: 1rem;
  background-color: ${Palette.mainTeal};
  height: 6.25rem;
  width: 6.25rem;
  font-size: 2.5rem;
`;
  
  export const EmptyAvatar = styled(Avatar)`
  margin-left: 1rem;
  height: 6.25rem;
  width: 6.25rem;
  margin-right: 1rem;
  cursor: pointer;
  transition: all 0.3s ease 0s;

  &:hover {
    background-color: ${Palette.mainTeal};
  }
`;

export const StyledLabel = styled('label')`
  > img {
    height: 6.25rem;
    width: 6.25rem;
    margin-right: 1rem;
    cursor: pointer;
    border-radius: 5rem;
  };

  > input {
    display: none;
  };
`;

export const DetailsContainer = styled('div')`
  display: flex;
  flex-direction: column;
  text-align: left;
  > h1 {
    font-weight: normal;
    margin-bottom: 0;
  };

  > p {
    margin-top: 0.5rem;
    color: ${Palette.thGray};
  };
`;

export const IconContainer = styled('div')`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  align-self: flex-start;

  > :first-of-type {
    margin-right: 1rem;
  };

  > img {
    height: 1.5rem;
    width: 1.5rem;
    cursor: pointer;
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

export const BodyContainer = styled('div')`
  display: flex;
  flex-direction: row;
  width: 80%;
`;

export const RightContainer = styled('div')`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
`;

export const AboutMeContainer = styled('div')`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
  width: 390px;
  height: 175px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  overflow-y: auto;
  text-align: left;
  background-color: ${Palette.mainTeal};
  color: white;
`;

export const TasksContainer = styled('div')`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
  width: 100%;
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
    width: 20%;
  };

  > :nth-of-type(4) {
    width: 20%;
  };
`;

export const OverflowContainer = styled('div')`
  overflow-y: auto;
  padding: 0 1rem;

  > p {
    text-align: center;
    margin-top: 4rem;
    color: ${Palette.thGray};
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
  margin-bottom: 3rem;
  height: 17rem;

  > h2 {
    margin-top: 0;
    margin-left: 1rem;
    font-weight: normal;
  };
`;

export const TextFieldStyle = {
  width: "100%",
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "white"
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: `${Palette.lightGray}`
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: `${Palette.offGray}`
    },
  }
}
