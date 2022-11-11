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
import { useEffect, useState } from "react";
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
  const [happinessData, setHappinessData] = useState<number[]>([]);
  const [busynessData, setBusynessData] = useState<number[]>([]);
  const [taskStatusData, setTaskStatusData] = useState<number[]>([]);
  
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

  const happinessGraphData = {
    labels: ['N/A', 'Stressed', 'Worried', 'Neutral', 'Comfortable', 'Happy'],
    datasets: [
      {
        // todo: replace mock with api data
        data: happinessData,
        backgroundColor: [
          CHART_BACKGROUND_RED,
          CHART_BACKGROUND_ORANGE,
          CHART_BACKGROUND_BLUE,
          CHART_BACKGROUND_YELLOW,
          CHART_BACKGROUND_GREEN,
          CHART_BACKGROUND_PURPLE,
        ],
        borderColor: [
          CHART_BORDER_RED,
          CHART_BORDER_ORANGE,
          CHART_BORDER_BLUE,
          CHART_BORDER_YELLOW,
          CHART_BORDER_GREEN,
          CHART_BORDER_PURPLE,
        ],
        borderWidth: 1,
      },
    ],
  };

  const busynessGraphData = {
    labels: ["0-19", "20-39", "40-59", "60-79", "80-99+"],
    datasets: [
      {
        data: busynessData,
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

  const taskStatusGraphData = {
    labels: ['Not started', 'In progress', 'Completed', 'Blocked'],
    datasets: [
      {
        data: taskStatusData,
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
      setHappinessData(Object.values(stats.happiness));
      setBusynessData(Object.values(stats.busyness));
      setTaskStatusData(Object.values(stats.tasks));
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
          <Pie data={happinessGraphData} />  
        </GraphWrapper>
      </SectionContainer>
      <SectionContainer>
        <h2>Collective busyness</h2>
        <Divider />
          <GraphWrapper>
            <Bar options={options} data={busynessGraphData} />
          </GraphWrapper>
      </SectionContainer>
      <SectionContainer>
        <h2>Status of tasks</h2>
        <Divider />
        <GraphWrapper>
          <Bar
            options={{...options, indexAxis: 'y' as const}}
            data={taskStatusGraphData}
          />
        </GraphWrapper>
      </SectionContainer>
      <Footer />
    </StatisticsPageContainer>
  );
};

export default StatisticsPage;
