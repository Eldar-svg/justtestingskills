import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ErrorPage from "./error-page";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Home from "./Home";
import UseReduceStates from "./useReduceStates";
import LogIn from "./LogIn";
import reportWebVitals from "./reportWebVitals";
import SinglePage from "./SinglePage";
import { QueryClientProvider, QueryClient } from "react-query";

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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={clientQ}><UseReduceStates>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </UseReduceStates></QueryClientProvider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
