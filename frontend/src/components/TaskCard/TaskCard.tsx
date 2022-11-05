import { useNavigate } from "react-router-dom";
import { Palette } from "../Palette";
import { TaskCardContainer } from "./style";

type TaskCardProps = {
  // todo: may need project id/name as well in future for displayed taskid
  projectId: number;
  taskId: number;
  title: string;
  deadline: string;
  status: number;
}

type TaskStatusProps = {
  0: string;
  1: string;
  2: string;
  3: string;
}

const taskStatus: TaskStatusProps = {
  0: "Not Started",
  1: "In Progress",
  2: "Completed",
  3: "Blocked"
}

const TaskCard = ({ projectId, taskId, title, deadline, status}: TaskCardProps) => {
  const navigate = useNavigate();

  const fetchStatusColor = () => {
    if (status === 0) {
      return Palette.thGray;
    } else if (status === 1) {
      return Palette.progressBlue;
    } else if (status === 2) {
      return Palette.errorRed;
    } else if (status === 3) {
      return Palette.successGreen;
    } else {
      return 'black';
    }
  };
  let formattedDeadline;
  if (deadline !== null) {
    formattedDeadline = deadline.split("-");  
    formattedDeadline.reverse();
    formattedDeadline = formattedDeadline.join("/");
    console.log(formattedDeadline)
  }
  console.log(projectId)
  return (
    <TaskCardContainer onClick={() => navigate(`/project/${projectId}/task/${taskId}`)}>
      <p>{taskId}</p>
      <p>{title}</p>
      <p>{formattedDeadline}</p>
      {/* todo: do we want to have this editable? i.e. a <select> component */}
      <p
        style={{ backgroundColor: fetchStatusColor(), color: "white", borderRadius: "1rem", textAlign: "center"}}
      >{taskStatus[status as keyof TaskStatusProps]}</p>
    </TaskCardContainer>
  );
};

export default TaskCard;