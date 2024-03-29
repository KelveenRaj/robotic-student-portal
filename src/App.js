import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import AuthLayout from "./components/Layout/AuthLayout";
import PrivateRoute from "./components/PrivateRoute";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import SignUpPage from "./pages/SignUpPage";
import Dashboard from "./pages/Dashboard";
import Test from "./pages/TestPage";
import ForgotPassword from "./pages/ForgotPassword";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<AuthLayout />}>
        <Route index element={<IndexPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="logout" element={<LogoutPage />} />
      </Route>

      {/* protected routes */}
      <Route element={<PrivateRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="test" element={<Test />} />
      </Route>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
