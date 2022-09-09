import { LayoutTheme } from "../HOC/Layout/LayoutTheme.js";
import { CreateProjectPage } from "../pages/CreateProjectPage/CreateProjectPage.js";
import { CreateTaskPage } from "../pages/CreateTaskPage/CreateTaskPage.js";
import { LoginPage } from "../pages/LoginPage/LoginPage.js";
import { ProjectDetailPage } from "../pages/ProjectDetailPage/ProjectDetailPage.js";
import { UpdateTaskModal } from "../pages/ProjectDetailPage/TaskManagement/UpdateTaskModal.js";
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
  {
    path: "/createproject",
    component: <LayoutTheme Component={CreateProjectPage} />,
  },
  {
    path: "/createtask",
    component: <LayoutTheme Component={CreateTaskPage} />,
  },
  {
    path: "/projectdetail/:projectId",
    component: <LayoutTheme Component={ProjectDetailPage} />,
  },
  {
    path: "/updatetask",
    component: <UpdateTaskModal />,
  },
];
