import { useNavigate } from "react-router-dom";
import { TaskCardContainer } from "./style";

type TaskCardProps = {
  // todo: may need project id/name as well in future
  taskId: string;
  title: string;
  deadline: string;
  status: string;
}

const TaskCard = ({ taskId, title, deadline, status}: TaskCardProps) => {
  const navigate = useNavigate();

  return (
    <TaskCardContainer  onClick={() => navigate(`/task/${taskId}`)}>
      <p>{taskId}</p>
      <p>{title}</p>
      <p>{deadline}</p>
      {/* todo: do we want to have this editable? i.e. a <select> component */}
      <p>{status}</p>
    </TaskCardContainer>
  );
};

export default TaskCard;