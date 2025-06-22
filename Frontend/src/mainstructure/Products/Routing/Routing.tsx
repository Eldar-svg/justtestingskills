import React, { ReactElement } from "react";
import { QueryClient } from "react-query"; // или "@tanstack/react-query"
import { createBrowserRouter, Navigate } from "react-router-dom";
import ErrorPage from "../../../error-page";
import LogIn from "../../User/LogIn";
import SinglePage from "./SinglePage";
import Home from "./Home";
import App from "../../../App";
import EditCoffe from "../coffe-list/EditCoffe";
import SingUp from "../../User/SingUp";
import Layout from "./Layout";

interface ProtectedRouteProps {
  element: ReactElement;
}

interface RouterReady {
  clientQ: QueryClient;
  router: ReturnType<typeof createBrowserRouter>;
}

function ProtectedRoute({ element }: ProtectedRouteProps): JSX.Element {
  const isAuth = !sessionStorage.getItem("token");
  return isAuth ? element : <Navigate to="/login" replace />;
}

function useRouting(): RouterReady {
  const clientQ = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LogIn />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/signup",
      element: <SingUp />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/",
      element: <ProtectedRoute element={<Home />} />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/products",
      element: <ProtectedRoute element={<App />} />,
    },
    {
      path: "/products/:id",
      element: <Layout />,
      children: [
        { path: "", element: <ProtectedRoute element={<SinglePage />} /> },
      ],
      errorElement: <ErrorPage />,
    },
    {
      path: "/products/edit/:id",
      element: <ProtectedRoute element={<EditCoffe />} />,
      errorElement: <ErrorPage />,
    },
  ]);

  return { clientQ, router };
}

export default useRouting;
