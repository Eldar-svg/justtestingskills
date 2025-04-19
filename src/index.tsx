import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
 
import UseReduceStates from "./hooks/useReduceStates";
import reportWebVitals from "./reportWebVitals";
import { QueryClientProvider } from "react-query";
import useRouting from "./Routing";
import ToastProvider from "./hooks/useToast";
const Main : React.FC = () => {
 

  const { clientQ, router } = useRouting(); // Хук вызывается внутри компонента
  return (
    <QueryClientProvider client={clientQ}>
      <ToastProvider>
        <UseReduceStates>
          <RouterProvider router={router}/>
 
        </UseReduceStates>
      </ToastProvider>
    </QueryClientProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
