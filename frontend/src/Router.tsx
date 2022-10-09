import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

const AuthenticatedRoutes = () => {
  const token = sessionStorage.getItem(process.env.REACT_APP_TOKEN!);
  return (
    !!token ? <Outlet /> : <Navigate to="/login" />
  );
};

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={ <LandingPage /> } />
      <Route path='/login' element={ <LoginPage /> } />
      <Route path='/signup' element={ <SignUpPage /> } />
      <Route element={ <AuthenticatedRoutes /> }>
        <Route path='/profile/:profileId' element={ <ProfilePage /> } />
        <Route path='/task/:taskId' element={ <div>this be the task page</div> } />
        <Route path='/dashboard' element={ <DashboardPage /> } />
      </Route>
      <Route path="*" element={ <div>this is the 404 page</div> } />
    </Routes>
  </BrowserRouter>
);

export default Router;
