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
import { useEffect } from "react";
import { getProjectStatistics } from "../../api/project";
import { useParams } from "react-router-dom";

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
  const { projectId } = useParams();
  // const [projectData, setProjectData] = useState({});
  // const [isLoading, setIsLoading] = useState(true);
  const CHART_BACKGROUND_RED = "rgb(255, 99, 132, 0.2)";
  const CHART_BACKGROUND_YELLOW = "rgb(255, 205, 86, 0.2)";
  const CHART_BACKGROUND_BLUE = "rgba(54, 162, 235, 0.2)";
  const CHART_BACKGROUND_ORANGE = "rgb(255, 159, 64, 0.2)";
  const CHART_BACKGROUND_GREEN = "rgb(75, 192, 192, 0.2)";
  const CHART_BACKGROUND_PURPLE = 'rgb(153, 102, 255, 0.2)';

  const CHART_BORDER_RED = "rgb(255, 99, 132)";
  const CHART_BORDER_YELLOW = "rgb(255, 205, 86)";
  const CHART_BORDER_BLUE = "rgb(54, 162, 235, 1)";
  const CHART_BORDER_ORANGE = "rgb(255, 159, 64, 1)";
  const CHART_BORDER_GREEN = "rgb(75, 192, 192)";
  const CHART_BORDER_PURPLE = 'rgb(153, 102, 255, 1)';
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const happinessTrackerData = {
    labels: ['Stressed', 'Worried', 'Neutral', 'Comfortable', 'Happy'],
    datasets: [
      {
        // todo: replace mock with api data
        data: [12, 19, 3, 2, 3],
        backgroundColor: [
          CHART_BACKGROUND_RED,
          CHART_BACKGROUND_BLUE,
          CHART_BACKGROUND_YELLOW,
          CHART_BACKGROUND_GREEN,
          CHART_BACKGROUND_PURPLE,
        ],
        borderColor: [
          CHART_BORDER_RED,
          CHART_BORDER_BLUE,
          CHART_BORDER_YELLOW,
          CHART_BORDER_GREEN,
          CHART_BORDER_PURPLE,
        ],
        borderWidth: 1,
      },
    ],
  };

  const busynessData = {
    labels: ["0-19", "20-39", "40-59", "60-79", "80-99+"],
    datasets: [
      {
        label: "Happiness",
        // todo: replace mock data with api data
        data: [12, 2, 6, 10, 7],
        backgroundColor: [
          CHART_BACKGROUND_YELLOW,
          CHART_BACKGROUND_ORANGE,
          CHART_BACKGROUND_GREEN,
          CHART_BACKGROUND_PURPLE,
          CHART_BACKGROUND_RED,
        ],
        borderColor: [
          CHART_BORDER_YELLOW,
          CHART_BORDER_ORANGE,
          CHART_BORDER_GREEN,        
          CHART_BORDER_PURPLE,
          CHART_BORDER_RED,
        ],
        borderWidth: 1,
      },
    ],
  };

  const taskStatusData = {
    labels: ['Not started', 'In progress', 'Completed', 'Blocked'],
    datasets: [
      {
        data: [12, 20, 45, 2],
        backgroundColor: [
          CHART_BACKGROUND_YELLOW,
          CHART_BACKGROUND_BLUE,
          CHART_BACKGROUND_GREEN,
          CHART_BACKGROUND_RED,
        ],
        borderColor: [
          CHART_BORDER_YELLOW,
          CHART_BORDER_BLUE,
          CHART_BORDER_GREEN,
          CHART_BORDER_RED,
        ],
        borderWidth: 1,
      },
    ],
  };

  const fetchProjectStatistics = async () => {
    try {
      const stats = await getProjectStatistics(projectId!);
      console.log(stats);
    } catch (err: any) {
      // todo: error handling
      console.log(err);
    };
  };

  useEffect(() => {
    fetchProjectStatistics();
    // eslint-disable-next-line
  }, []);
  
  return (
    <StatisticsPageContainer>
      {/* todo: loading element */}
      <Header />
      <SectionContainer>
        <h2>Happiness tracker</h2>
        <Divider />
        <GraphWrapper>
          <Pie data={happinessTrackerData} />  
        </GraphWrapper>
      </SectionContainer>
      <SectionContainer>
        <h2>Collective busyness</h2>
        <Divider />
          <GraphWrapper>
            <Bar options={options} data={busynessData} />
          </GraphWrapper>
      </SectionContainer>
      <SectionContainer>
        <h2>Status of tasks</h2>
        <Divider />
        <GraphWrapper>
          <Bar
            options={{...options, indexAxis: 'y' as const}}
            data={taskStatusData}
          />
        </GraphWrapper>
      </SectionContainer>
      <Footer />
    </StatisticsPageContainer>
  );
};

export default StatisticsPage;
