import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

interface FetchedData {
  username: string;
  role: string;
}

function Root():JSX.Element {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (!token) {
      setErrorMessage("Token not found, please log in again.");
      return;
    }

    setIsLoggedIn(true);
    setRole(storedRole || "");

    // Получаем данные пользователя
    const fetchUserData = async (): Promise<void> => {
      try {
        const response = await axios.get<FetchedData>(
          "http://localhost:5000/current-user",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Отправляем токен
            },
          }
        );
        setUsername(response.data.username); // Устанавливаем имя пользователя
      } catch (err) {
        const error = err as AxiosError<{ message?: string }>;
        setErrorMessage(error.response?.data?.message || "Error fetching user data. Please log in again.");
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogOut = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setRole("");
    setUsername("");
    navigate("/login");
  };

  return (
    <div>
      <ul
        style={{
          maxWidth: "100%", // Максимальная ширина
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px", // Отступы между элементами
          flexWrap: "wrap", // Позволяет переносить элементы, если не помещаются
          flexDirection: "row",
          listStyle: "none",
        } as React.CSSProperties}
      >
        <li>
          <Link style={{ textDecoration: "none" }} to={`/`}>
            About Us
          </Link>
        </li>
        <li>
          <Link style={{ textDecoration: "none" }} to={`/products`}>
            Products
          </Link>
        </li>
        <li>Contacts</li>
        <h3>
          Welcome {username || "guest"}! Role: {role}
        </h3>
        {isLoggedIn && <button onClick={handleLogOut}>Logout</button>}
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      </ul>
    </div>
  );
}

export default Root;
