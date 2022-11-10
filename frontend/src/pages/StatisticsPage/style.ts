import { styled } from "@mui/system";

export const StatisticsPageContainer = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  position: relative;
  padding-bottom: 3rem;
`;

export const SectionContainer = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 0 3rem;
  margin-bottom: 1rem;
  > h2 {
    font-weight: normal;
  }
`; 

export const GraphWrapper = styled('div')`
  align-self: center;
  position: relative;
  height: 20rem;
  width: 20rem;
`;
