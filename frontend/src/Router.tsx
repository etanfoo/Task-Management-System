import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import FriendsPage from "./pages/FriendsPage/FriendsPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import CreateProjectPage from "./pages/CreateProject/CreateProject";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import ProjectPage from "./pages/ProjectPage/ProjectPage";
import TaskPage from "./pages/TaskPage/TaskPage";
import StatisticsPage from "./pages/StatisticsPage/StatisticsPage";

const AuthenticatedRoutes = () => {
  const token = sessionStorage.getItem(process.env.REACT_APP_TOKEN!);
  return !!token ? <Outlet /> : <Navigate to="/login" />;
};

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={ <LandingPage /> } />
      <Route path='/login' element={ <LoginPage /> } />
      <Route path='/signup' element={ <SignUpPage /> } />
      <Route element={ <AuthenticatedRoutes /> }>
        <Route path='/profile/:profileId' element={ <ProfilePage /> } />
        <Route path='/task/:taskId' element={ <TaskPage /> } />
        <Route path='/dashboard' element={ <DashboardPage /> } />
        <Route path='/project/create' element={ <CreateProjectPage /> } />
        <Route path='/project/:projectId' element={ <ProjectPage /> } />
        <Route
          path="/project/:projectId/statistics"
          element={<StatisticsPage />}
        />
        <Route path="/friends" element={<FriendsPage />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
