import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/home";
import AdmManagement from "./pages/admManagement";
import Login from "./pages/login";
import ProtectedRoute from "./service/ProtectedRoute";
import PerspectiveDetailPage from "./pages/perpective/PerspectiveDetailPage";
import ProjectDetailPage from "./pages/project/ProjectDetailPage";
import ProjectsPage from "./features/projects/ProjectsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  { path: "/projetos/:slug", 
    element: <ProjectDetailPage /> 
  },
  {
    path: "/perspectiva/:slug",
    element: <PerspectiveDetailPage />,
  },
  {
   path: "/projetos",
   element: <ProjectsPage />,
  },
  {
 path: "/projeto",
 element: <ProjectsPage />,
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
