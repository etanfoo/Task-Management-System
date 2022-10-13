import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { BodyContainer, DashboardPageContainer } from "./style";
import { MockTasks } from "../../constants/profile-page-constants";
import TaskCard from "../../components/TaskCard/TaskCard";

const DashboardPage = () => {
  return(
    <DashboardPageContainer>
      <Header />
      <BodyContainer>
        {/* copy jobs board single job page */}
        <div style={{ borderRight: '1px solid black', borderTop: '1px solid black', height: '100%', width: '10rem', borderRadius: '1rem', padding: '1rem' }}>
          this is the dashboard page
        </div>
        <div style={{ height: "100%", width: '100%', padding: '0 2rem' }}>
          <TextField fullWidth sx={{ marginBottom: '2rem' }}></TextField>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <FormControl sx={{ width: '15%', textAlign: 'left' }}>
              <InputLabel>Your stuff</InputLabel>
              <Select
                defaultValue="Your tasks"
                // value={age}
                label="Your tasks"
                // onChange={handleChange}
              >
                <MenuItem value="Your tasks">Your tasks</MenuItem>
                <MenuItem value="Your projects">Your projects</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: '15%', textAlign: 'left' }}>
              <InputLabel>Sort by</InputLabel>
              <Select
                defaultValue="Sort by"
                // value={age}
                label="Your tasks"
                // onChange={handleChange}
              >
                <MenuItem value="Sort by">Sort by</MenuItem>
                <MenuItem value="Your projects">Your projects</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={{ width: '100%', height: '100%', border: '1px solid black', padding: '2rem' }}>
            {MockTasks.map((task) => (
              <TaskCard
                key={task.taskId}
                taskId={task.taskId}
                title={task.title}
                deadline={task.deadline}
                status={task.status}
              />
            ))}
          </div>
        </div>
      </BodyContainer>
      <Footer />
    </DashboardPageContainer>
  );
}

export default DashboardPage;