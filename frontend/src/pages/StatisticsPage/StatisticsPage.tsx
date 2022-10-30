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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StatisticsPage = () => {
  const NONE_FACE = 0
  const STRESSED = 1
  const WORRIED = 2
  const NEUTRAL = 3
  const COMFORTABLE = 4
  const HAPPY = 5
  const HAPPINESS_TRACKER_BACKGROUND_GREY = 'rgb(201, 203, 207, 0.2)';
  const HAPPINESS_TRACKER_BACKGROUND_RED = 'rgb(255, 99, 132, 0.2)';
  const HAPPINESS_TRACKER_BACKGROUND_ORANGE = 'rgb(255, 159, 64, 0.2)';
  const HAPPINESS_TRACKER_BACKGROUND_PURPOSE = 'rgb(153, 102, 255, 0.2)';
  const HAPPINESS_TRACKER_BACKGROUND_YELLOW = 'rgb(255, 205, 86, 0.2)';
  const HAPPINESS_TRACKER_BACKGROUND_GREEN = 'rgb(75, 192, 192, 0.2)';

  const HAPPINESS_TRACKER_BORDER_GREY = 'rgb(201, 203, 207)';
  const HAPPINESS_TRACKER_BORDER_RED = 'rgb(255, 99, 132)';
  const HAPPINESS_TRACKER_BORDER_ORANGE = 'rgb(255, 159, 64)';
  const HAPPINESS_TRACKER_BORDER_PURPOSE = 'rgb(153, 102, 255)';
  const HAPPINESS_TRACKER_BORDER_YELLOW = 'rgb(255, 205, 86)';
  const HAPPINESS_TRACKER_BORDER_GREEN = 'rgb(75, 192, 192)';

  const EMPTY_HAPPINESS_TRACKER_DATA = [0, 0, 0, 0, 0, 0];

  const { projectId } = useParams();
  const [currentMembers, setCurrentMembers] = useState<IProfile[]>([]);
  const [happinessTrackerData, setHappinessTrackerData] = useState<number[]>(
    EMPTY_HAPPINESS_TRACKER_DATA
  );

  // TODO: set stepSize to 1
  // TODO: set to whole numbers only
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Happiness Tracker",
      },
    },
  };

  // TODO: do we want to include "NONE FACE"
  const labels = [
    "N/A",
    "Stressed",
    "Worried",
    "Neutral",
    "Comfortable",
    "Happy",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Happiness",
        data: happinessTrackerData,
        backgroundColor: [
         HAPPINESS_TRACKER_BACKGROUND_GREY,
         HAPPINESS_TRACKER_BACKGROUND_RED,
         HAPPINESS_TRACKER_BACKGROUND_ORANGE,
         HAPPINESS_TRACKER_BACKGROUND_PURPOSE,
         HAPPINESS_TRACKER_BACKGROUND_YELLOW,
         HAPPINESS_TRACKER_BACKGROUND_GREEN
        ],
        borderColor: [
         HAPPINESS_TRACKER_BORDER_GREY,
         HAPPINESS_TRACKER_BORDER_RED,
         HAPPINESS_TRACKER_BORDER_ORANGE,
         HAPPINESS_TRACKER_BORDER_PURPOSE,
         HAPPINESS_TRACKER_BORDER_YELLOW,
         HAPPINESS_TRACKER_BORDER_GREEN
        ],
        borderWidth: 1
      },
    ],
  };

  const loadProject = async () => {
    try {
      const resp = await getProject(projectId!);
      setCurrentMembers(resp.profiles);

      let tmpHappinessTrackerData = EMPTY_HAPPINESS_TRACKER_DATA;
      resp.profiles.map((profile: IProfile) => {
        console.log(profile.happiness);
        ++tmpHappinessTrackerData[profile.happiness]
      })
      setHappinessTrackerData(tmpHappinessTrackerData);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadProject();
  }, []);

  return (
    <>
      <Bar options={options} data={data} />;
    </>
  );
};
export default StatisticsPage;
