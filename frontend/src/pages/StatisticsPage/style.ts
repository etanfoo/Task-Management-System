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

export const SectionContainer = styled("div")`
  display: flex;
  flex-direction: column;
  padding: 0 3rem;
  margin-bottom: 1rem;
  > h2 {
    font-weight: normal;
    font-size: 2rem;
  }
`;

export const GraphWrapper = styled("div")`
  margin-top: 1.5rem;
  align-self: center;
  position: relative;
  width: 30rem;
`;
