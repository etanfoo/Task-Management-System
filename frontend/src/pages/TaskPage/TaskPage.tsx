import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import FriendsList from "../../components/FriendsList/FriendsList";
import Header from "../../components/Header/Header";
import { TaskPageContainer } from "./style";

const TaskPage = () => {
  const { taskId } = useParams();
  
  return(
    <TaskPageContainer>
      <Header />
      <FriendsList />
      <Footer />
    </TaskPageContainer>
  )
}

export default TaskPage;