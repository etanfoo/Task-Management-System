import { useNavigate } from "react-router-dom";
import { Palette } from "../Palette";
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
      <p style={{ color: Palette.thGray, width: '10%' }}>{taskId}</p>
      <p style={{ width: '50%' }}>{title}</p>
      <p style={{ width: '20%' }}>{deadline}</p>
      {/* todo: do we want to have this editable? i.e. a <select> component */}
      <p style={{ width: '20%' }}>{status}</p>
    </TaskCardContainer>
  );
};

export default TaskCard;