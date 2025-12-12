import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/home";
import AdmManagement from "./pages/admManagement";
import Login from "./pages/login";
import ProtectedRoute from "./service/ProtectedRoute";
import ProjectsPage from "./features/projects/ProjectsPage";
import ProjectPage from "./pages/project";
import ProjectDetail from "./pages/projectDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
   path: "/projetos",
   element: <ProjectsPage />,
  },
  { 
    path: "/projetos/:slug", 
    element: <ProjectPage /> 
  },
  { 
    path: "/projetos/:slug/complete",
    element: <ProjectDetail />
  },
  {
    path: "guara-adm",
    element: (
      <ProtectedRoute>
        <AdmManagement />
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
