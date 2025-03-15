import React from "react";
import { QueryClient } from "react-query"; // или "@tanstack/react-query"
import { createBrowserRouter, Navigate } from "react-router-dom";
import ErrorPage from "./error-page";
import LogIn from "./LogIn";
import SinglePage from "./SinglePage";
import Home from "./Home";
import App from "./App";
import EditCoffe from "./mainstructure/Products/coffe-list/EditCoffe";
import SingUp from "./SingUp";

// Интерфейс для пропсов ProtectedRoute
interface ProtectedRouteProps {
  element: React.ReactNode;
}

// Компонент ProtectedRoute (вынесен наружу)
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const isAuth = !!sessionStorage.getItem("token"); // Преобразуем в boolean
  return isAuth ? element : <Navigate to="/login" />;
};

// Интерфейс для возвращаемого значения useRouting
interface RouterReady {
  clientQ: QueryClient;
  router: ReturnType<typeof createBrowserRouter>
}

// Хук useRouting
function useRouting(): RouterReady {
  const clientQ = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // Опционально, как ты делал раньше
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
      element: <ProtectedRoute element={<SinglePage />} />,
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
 