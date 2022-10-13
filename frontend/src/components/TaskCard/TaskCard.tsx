import { useNavigate } from "react-router-dom";
import { Palette } from "../Palette";
import { TaskCardContainer } from "./style";

type TaskCardProps = {
  // todo: may need project id/name as well in future for displayed taskid
  taskId: string;
  title: string;
  deadline: string;
  status: string;
}

const TaskCard = ({ taskId, title, deadline, status}: TaskCardProps) => {
  const navigate = useNavigate();

  const fetchStatusColor = () => {
    if (status === "Not Started") {
      return Palette.thGray;
    } else if (status === "In Progress") {
      return Palette.progressBlue;
    } else if (status === "Blocked") {
      return Palette.errorRed;
    } else if (status === "Completed") {
      return Palette.successGreen;
    } else {
      return 'black';
    }
  };
  
  return (
    <TaskCardContainer  onClick={() => navigate(`/task/${taskId}`)}>
      <p>{taskId}</p>
      <p>{title}</p>
      <p>{deadline}</p>
      {/* todo: do we want to have this editable? i.e. a <select> component */}
      <p style={{ color: fetchStatusColor() }}>{status}</p>
    </TaskCardContainer>
  );
};

export default TaskCard;