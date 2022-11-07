import { useParams } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getProject } from "../../api/project";
import { useEffect, useState } from "react";
import { IProfile } from "../../interfaces/api-response";
import { StatisticsPageContainer } from "./style";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HappinessTrackerGraph = () => {
  const HAPPINESS_TRACKER_BACKGROUND_RED = "rgb(255, 99, 132, 0.2)";
  const HAPPINESS_TRACKER_BACKGROUND_ORANGE = "rgb(255, 159, 64, 0.2)";
  const HAPPINESS_TRACKER_BACKGROUND_PURPLE = "rgb(153, 102, 255, 0.2)";
  const HAPPINESS_TRACKER_BACKGROUND_YELLOW = "rgb(255, 205, 86, 0.2)";
  const HAPPINESS_TRACKER_BACKGROUND_GREEN = "rgb(75, 192, 192, 0.2)";

  const HAPPINESS_TRACKER_BORDER_RED = "rgb(255, 99, 132)";
  const HAPPINESS_TRACKER_BORDER_ORANGE = "rgb(255, 159, 64)";
  const HAPPINESS_TRACKER_BORDER_PURPLE = "rgb(153, 102, 255)";
  const HAPPINESS_TRACKER_BORDER_YELLOW = "rgb(255, 205, 86)";
  const HAPPINESS_TRACKER_BORDER_GREEN = "rgb(75, 192, 192)";

  const EMPTY_HAPPINESS_TRACKER_DATA = [0, 0, 0, 0, 0];

  const { projectId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [happinessTrackerData, setHappinessTrackerData] = useState(
    EMPTY_HAPPINESS_TRACKER_DATA
  );

  const options = {
    scales: {
      y: {
        ticks: {
          stepSize: 1,
        },
      },
    },

    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Happiness Tracker",
      },
    },
  };

  const data = {
    labels: ["Stressed", "Worried", "Neutral", "Comfortable", "Happy"],
    datasets: [
      {
        label: "Happiness",
        data: happinessTrackerData,
        backgroundColor: [
          HAPPINESS_TRACKER_BACKGROUND_RED,
          HAPPINESS_TRACKER_BACKGROUND_ORANGE,
          HAPPINESS_TRACKER_BACKGROUND_PURPLE,
          HAPPINESS_TRACKER_BACKGROUND_YELLOW,
          HAPPINESS_TRACKER_BACKGROUND_GREEN,
        ],
        borderColor: [
          HAPPINESS_TRACKER_BORDER_RED,
          HAPPINESS_TRACKER_BORDER_ORANGE,
          HAPPINESS_TRACKER_BORDER_PURPLE,
          HAPPINESS_TRACKER_BORDER_YELLOW,
          HAPPINESS_TRACKER_BORDER_GREEN,
        ],
        borderWidth: 1,
      },
    ],
  };

  const loadProject = async () => {
    try {
      const response = await getProject(projectId!);

      let tmpHappinessTrackerData = EMPTY_HAPPINESS_TRACKER_DATA;
      response.profiles.map(
        (profile: IProfile) => ++tmpHappinessTrackerData[profile.happiness!]
      );
      setHappinessTrackerData(tmpHappinessTrackerData);
      setIsLoading(false);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadProject();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <Bar options={options} data={data} />
      )}
    </>
  );
};

const StatisticsPage = () => {
  return (
    <StatisticsPageContainer>
      <HappinessTrackerGraph />
    </StatisticsPageContainer>
  );
};
export default StatisticsPage;