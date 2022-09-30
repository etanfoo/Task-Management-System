import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";

const AuthenticatedRoutes = () => {
  const token = sessionStorage.getItem(process.env.REACT_APP_TOKEN!);
  return (
    !!token ? <Outlet /> : <Navigate to="/login" />
  );
};

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={ <div>this is the landing page</div> } />
      <Route path='/login' element={ <LoginPage /> } />
      <Route path='/signup' element={ <div>this is the signup page</div> } />
      <Route element={<AuthenticatedRoutes />}>
        <Route path='/profile/:profileId' element={ <div>this is a profile page</div> } />
      </Route>
      <Route path="*" element={ <div>this is the 404 page</div> } />
    </Routes>
  </BrowserRouter>
);

export default Router;
