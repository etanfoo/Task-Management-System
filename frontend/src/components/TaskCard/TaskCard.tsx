import { useNavigate } from "react-router-dom";
import { taskStatus } from "../../constants/tasks";
import { fetchStatusColor, formatDate } from "../../helpers";
import { TaskStatus } from "../../interfaces/task";
import { TaskCardContainer } from "./style";

type TaskCardProps = {
  // todo: may need project id/name as well in future for displayed taskid
  projectId: number;
  taskId: number;
  title: string;
  deadline: string;
  status: number;
}

const TaskCard = ({ projectId, taskId, title, deadline, status}: TaskCardProps) => {
  const navigate = useNavigate();

  if (deadline !== null) deadline = formatDate(deadline);

  return (
    <TaskCardContainer onClick={() => navigate(`/project/${projectId}/task/${taskId}`)}>
      <p>{taskId}</p>
      <p>{title}</p>
      <p>{deadline}</p>
      {/* todo: do we want to have this editable? i.e. a <select> component */}
      <p
        style={{ backgroundColor: fetchStatusColor(status), color: "white", borderRadius: "1rem", textAlign: "center"}}
      >{taskStatus[status as keyof TaskStatus]}</p>
    </TaskCardContainer>
  );
};

export default TaskCard;