import { LayoutTheme } from "../HOC/Layout/LayoutTheme.js";
import { LoginPage } from "../pages/LoginPage/LoginPage.js";
import { ProjectManagementPage } from "../pages/ProjectManagementPage/ProjectManagementPage.js";
import { SignupPage } from "../pages/SignupPage/SignupPage.js";

export const userRoutes = [
  {
    path: "/login",
    component: <LoginPage />,
  },
  {
    path: "/register",
    component: <SignupPage />,
  },
  {
    path: "/projectmanagement",
    component: <LayoutTheme Component={ProjectManagementPage} />,
  },
];
