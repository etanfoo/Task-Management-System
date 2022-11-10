// import { getProject } from "../../api/project";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { SectionContainer, StatisticsPageContainer, GraphWrapper } from "./style";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Divider } from "@mui/material";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
);

const StatisticsPage = () => {

  const data = {
    labels: ['Stressed', 'Worried', 'Neutral', 'Comfortable', 'Happy'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const MOCKBAROPTIONS = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };
  // const HAPPINESS_TRACKER_BACKGROUND_RED = "rgb(255, 99, 132, 0.2)";
  // const HAPPINESS_TRACKER_BACKGROUND_ORANGE = "rgb(255, 159, 64, 0.2)";
  // const HAPPINESS_TRACKER_BACKGROUND_PURPLE = "rgb(153, 102, 255, 0.2)";
  // const HAPPINESS_TRACKER_BACKGROUND_YELLOW = "rgb(255, 205, 86, 0.2)";
  // const HAPPINESS_TRACKER_BACKGROUND_GREEN = "rgb(75, 192, 192, 0.2)";

  // const HAPPINESS_TRACKER_BORDER_RED = "rgb(255, 99, 132)";
  // const HAPPINESS_TRACKER_BORDER_ORANGE = "rgb(255, 159, 64)";
  // const HAPPINESS_TRACKER_BORDER_PURPLE = "rgb(153, 102, 255)";
  // const HAPPINESS_TRACKER_BORDER_YELLOW = "rgb(255, 205, 86)";
  // const HAPPINESS_TRACKER_BORDER_GREEN = "rgb(75, 192, 192)";

  // const EMPTY_HAPPINESS_TRACKER_DATA = [0, 0, 0, 0, 0];

  const { projectId } = useParams();
  const [projectData, setProjectData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // const [happinessTrackerData, setHappinessTrackerData] = useState(
  //   EMPTY_HAPPINESS_TRACKER_DATA
  // );

  // const options = {
  //   scales: {
  //     y: {
  //       ticks: {
  //         stepSize: 1,
  //       },
  //     },
  //   },

  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       display: false,
  //     },
  //     title: {
  //       display: true,
  //       text: "Happiness Tracker",
  //     },
  //   },
  // };

  // const data = {
  //   labels: ["Stressed", "Worried", "Neutral", "Comfortable", "Happy"],
  //   datasets: [
  //     {
  //       label: "Happiness",
  //       data: happinessTrackerData,
  //       backgroundColor: [
  //         HAPPINESS_TRACKER_BACKGROUND_RED,
  //         HAPPINESS_TRACKER_BACKGROUND_ORANGE,
  //         HAPPINESS_TRACKER_BACKGROUND_PURPLE,
  //         HAPPINESS_TRACKER_BACKGROUND_YELLOW,
  //         HAPPINESS_TRACKER_BACKGROUND_GREEN,
  //       ],
  //       borderColor: [
  //         HAPPINESS_TRACKER_BORDER_RED,
  //         HAPPINESS_TRACKER_BORDER_ORANGE,
  //         HAPPINESS_TRACKER_BORDER_PURPLE,
  //         HAPPINESS_TRACKER_BORDER_YELLOW,
  //         HAPPINESS_TRACKER_BORDER_GREEN,
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // const loadProject = async () => {
  //   try {
  //     const response = await getProject(projectId!);
  //     console.log(response);
  //     // let tmpHappinessTrackerData = EMPTY_HAPPINESS_TRACKER_DATA;
  //     // response.profiles.map(
  //     //   (profile: IProfile) => ++tmpHappinessTrackerData[profile.happiness!]
  //     // );
  //     // setHappinessTrackerData(tmpHappinessTrackerData);
  //     // setIsLoading(false);
  //   } catch (err: any) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   loadProject();
  //   // eslint-disable-next-line
  // }, []);


  return (
    <StatisticsPageContainer>
      <Header />
      <SectionContainer>
        <h2>Happiness tracker</h2>
        <Divider />
        <GraphWrapper>
          <Pie data={data} />  
        </GraphWrapper>
      </SectionContainer>
      <SectionContainer>
        <h2>Collective busyness</h2>
        <Divider />
        {/* todo: insert column graph indicating percentages of happy, sad, mid, etc. */}
      </SectionContainer>
      <SectionContainer>
        <h2>Status of tasks</h2>
        <Divider />
        {/* todo: insert table? for number of ... */}
      </SectionContainer>
      <Footer />
    </StatisticsPageContainer>
  );
};

export default StatisticsPage;
