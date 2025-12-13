import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import AdmManagement from "./pages/AdmManagement";
import Login from "./pages/Login";
import ProtectedRoute from "./service/ProtectedRoute";
import AllProjects from "./pages/AllProjects";
import ProjectPage from "./pages/Project";
import ProjectDetail from "./pages/ProjectDetail";

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
   element: <AllProjects />,
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
