// Layout.tsx
import { Outlet } from "react-router-dom";
import { DataContext } from "../../../App"; // Или перемести контекст в отдельный файл

const Layout = () => {
  const logdata = localStorage.getItem("role");


  return (
    <DataContext.Provider value={{ logdata }}>
      <Outlet />
    </DataContext.Provider>
  );
};

export default Layout;
