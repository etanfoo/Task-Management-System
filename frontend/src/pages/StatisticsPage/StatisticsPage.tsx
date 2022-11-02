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
import { HappinessValue } from "../../components/HappinessTracker/HappinessTracker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StatisticsPage = () => {
  const HAPPINESS_TRACKER_BACKGROUND_RED = "rgb(255, 99, 132, 0.2)";
  const HAPPINESS_TRACKER_BACKGROUND_ORANGE = "rgb(255, 159, 64, 0.2)";
  const HAPPINESS_TRACKER_BACKGROUND_PURPOSE = "rgb(153, 102, 255, 0.2)";
  const HAPPINESS_TRACKER_BACKGROUND_YELLOW = "rgb(255, 205, 86, 0.2)";
  const HAPPINESS_TRACKER_BACKGROUND_GREEN = "rgb(75, 192, 192, 0.2)";

  const HAPPINESS_TRACKER_BORDER_RED = "rgb(255, 99, 132)";
  const HAPPINESS_TRACKER_BORDER_ORANGE = "rgb(255, 159, 64)";
  const HAPPINESS_TRACKER_BORDER_PURPOSE = "rgb(153, 102, 255)";
  const HAPPINESS_TRACKER_BORDER_YELLOW = "rgb(255, 205, 86)";
  const HAPPINESS_TRACKER_BORDER_GREEN = "rgb(75, 192, 192)";

  const ADJUST_FOR_NO_NONE_VALUE = 1; // we don't represent "NONE_FACE" in our graph

  const EMPTY_HAPPINESS_TRACKER_DATA: HappinessValue[] = [0, 0, 0, 0, 0, 0];

  const { projectId } = useParams();
  const [happinessTrackerData, setHappinessTrackerData] = useState<
    HappinessValue[]
  >(EMPTY_HAPPINESS_TRACKER_DATA);

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

  const labels = ["Stressed", "Worried", "Neutral", "Comfortable", "Happy"];

  const data = {
    labels,
    datasets: [
      {
        label: "Happiness",
        data: happinessTrackerData,
        backgroundColor: [
          HAPPINESS_TRACKER_BACKGROUND_RED,
          HAPPINESS_TRACKER_BACKGROUND_ORANGE,
          HAPPINESS_TRACKER_BACKGROUND_PURPOSE,
          HAPPINESS_TRACKER_BACKGROUND_YELLOW,
          HAPPINESS_TRACKER_BACKGROUND_GREEN,
        ],
        borderColor: [
          HAPPINESS_TRACKER_BORDER_RED,
          HAPPINESS_TRACKER_BORDER_ORANGE,
          HAPPINESS_TRACKER_BORDER_PURPOSE,
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
      response.profiles.map((profile: IProfile) => {
        ++tmpHappinessTrackerData[profile.happiness];
      });
      setHappinessTrackerData(
        tmpHappinessTrackerData.slice(ADJUST_FOR_NO_NONE_VALUE)
      );
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadProject();
  }, []);

  return (
    <>
      <Bar options={options} data={data} />
    </>
  );
};
export default StatisticsPage;
