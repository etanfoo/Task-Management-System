import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";

const AuthenticatedRoutes = () => {
  const token = sessionStorage.getItem(process.env.REACT_APP_TOKEN!);
  return (
    !!token ? <Outlet /> : <Navigate to="/" />
  );
};

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={ <div>this is the landing page</div> } />
      <Route path='/login' element={ <div>this is the login page</div> } />
      <Route path='/signup' element={ <div>this is the signup page</div> } />
      <Route element={<AuthenticatedRoutes />}>
          <Route path='/profile/:profileId' element={ <div>this is a profile page</div> } />
        </Route>
        <Route path="*" element={ <div>this is the 404 page</div> } />

    </Routes>
  </BrowserRouter>
);

export default Router;
