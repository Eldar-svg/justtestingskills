import React from 'react'
import ErrorPage from "./error-page";
import LogIn from "./LogIn";
import SinglePage from "./SinglePage";
import Home from "./Home";
import {QueryClient } from "react-query";
import App from './App';

import {
    createBrowserRouter,
    Navigate,
    
  } from "react-router-dom";
function useRouting() {
    const ProtectedRoute = ({ element }) => {
        const isAuth = localStorage.getItem("token");
        return isAuth ? element : <Navigate to="/login" />;
      };
      
      const clientQ = new QueryClient()
      
      const router = createBrowserRouter([
        {
          path: "/login",
          element: <LogIn />,
          errorElement: <ErrorPage />,
        },
      
        {
          path: "/",
          element: <ProtectedRoute element={<Home />} />,
        },
      
        {
          path: "/products",
          element: <ProtectedRoute element={<App />} />,
        },
        {
          path: "/products/:id",
          element: <ProtectedRoute element={<SinglePage />} />,
        },
      ]);
  return {clientQ,router}
}

export default useRouting