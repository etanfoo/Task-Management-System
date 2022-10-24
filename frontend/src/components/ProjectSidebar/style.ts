import { styled } from "@mui/material";
import { Link } from "react-router-dom";
import { Palette } from "../Palette";

export const ProjectSidebarContainer = styled('div')`
  display: flex;
  flex-direction: column;
  border: 2px solid ${Palette.thGray};
  border-radius: 15px;
  border-left: 0;
  width: 18rem;
  
  // text-align: center;
  // height: 100%;
  // align-items: center;
`;

export const ProjectButton = styled(Link)`
  display: flex;
  text-decoration: none;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  margin-left: 2rem;
  transition: transform .2s;
  padding: 10px;
  color: black;
  // border-bottom: 2px solid #000000;
  &:hover {
    transform: scale(1.05);
    border-radius: 10px;
    background-color: #f8f9fa;
    width: 70%;
  }

  > img {
    width: 3rem;
    height: 3rem;
    margin-right: 1rem;
    border-radius: 5rem;
  };

  > h2 {
    margin-top: 0.5rem;
    // margin-left: 1rem;
    font-weight: normal;
  };

`;

export const ButtonBorder = styled('div')`
  width: 80%;
  margin-left: 1.5rem;
  border-bottom: 2px solid ${Palette.offGray};
`;
