import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // 1. Importe o Toaster
import "./index.css";
import Home from "./pages/Home";
import AdmManagement from "./pages/AdmManagement";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import AllProjects from "./pages/AllProjects";
import ProjectPage from "./pages/Project";
import ProjectDetail from "./pages/ProjectDetail";
import PerspectiveDetail from "./pages/PerspectiveDetail";
import Parceiros from "./pages/Parceiros";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Sobre from "./pages/Sobre";

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
    path: "/projeto/:slug",
    element: <ProjectPage />
  },
  {
    path: "/projeto/:slug/complete",
    element: <ProjectDetail />
  },
  {
    path: "/perspectiva/:slug",
    element: <PerspectiveDetail />
  },
  {
    path: "/parceiros",
    element: <Parceiros />
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />
  },
  {
    path: "/reset-password",
    element: <ResetPassword />
  },
  {
    path: "/sobre",
    element: <Sobre />
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
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        style: {
          borderRadius: '8px',
          background: '#333',
          color: '#fff',
        },
      }}
    />
    <RouterProvider router={router} />
  </StrictMode>
);
