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

const TaskCard = ({ projectId, taskId, title, deadline, status}: TaskCardProps) => {
  const navigate = useNavigate();

  const fetchStatusColor = () => {
    // if (status === "Not Started") {
    //   return Palette.thGray;
    // } else if (status === "In Progress") {
    //   return Palette.progressBlue;
    // } else if (status === "Blocked") {
    //   return Palette.errorRed;
    // } else if (status === "Completed") {
    //   return Palette.successGreen;
    // } else {
    //   return 'black';
    // }
  };
  
  return (
    <TaskCardContainer onClick={() => navigate(`/project/${projectId}/task/${taskId}`)}>
      <p>{taskId}</p>
      <p>{title}</p>
      <p>{deadline}</p>
      {/* todo: do we want to have this editable? i.e. a <select> component */}
      <p
      // style={{ backgroundColor: fetchStatusColor(), color: "white", borderRadius: "1rem", textAlign: "center"}}
      >{status}</p>
    </TaskCardContainer>
  );
};

export default TaskCard;