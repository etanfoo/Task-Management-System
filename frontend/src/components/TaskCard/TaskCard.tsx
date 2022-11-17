import { useNavigate } from "react-router-dom";
import { taskStatus } from "../../constants/tasks";
import { fetchStatusColor, formatDate } from "../../helpers";
import { TaskStatus } from "../../interfaces/task";
import { TaskCardContainer } from "./style";

type TaskCardProps = {
  projectId: number;
  taskId: number;
  title: string;
  deadline: string;
  status: number;
};

const TaskCard = ({
  projectId,
  taskId,
  title,
  deadline,
  status,
}: TaskCardProps) => {
  const navigate = useNavigate();

  if (deadline !== null) deadline = formatDate(deadline);

  return (
    <TaskCardContainer
      onClick={() => navigate(`/project/${projectId}/task/${taskId}`)}
    >
      <p>{taskId}</p>
      <p>{title}</p>
      <p>{deadline}</p>
      <p
        style={{
          backgroundColor: fetchStatusColor(status),
          color: "white",
          borderRadius: "1rem",
          textAlign: "center",
        }}
      >
        {taskStatus[status as keyof TaskStatus]}
      </p>
    </TaskCardContainer>
  );
};

export default TaskCard;
