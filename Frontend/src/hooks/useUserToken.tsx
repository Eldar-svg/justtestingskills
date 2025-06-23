import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
interface FetchedData {
  username: string;
  role: string;
  handleLogOut: () => void;
  isLoggedIn: boolean;
  errorMessage: string;
}

function useUserToken(): FetchedData {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const token = localStorage.getItem("token");
  const storedRole = localStorage.getItem("role");

  useEffect(() => {
    if (!token) {
      setErrorMessage("Token not found, please log in again.");
      return navigate("/login");
    }

    setIsLoggedIn(true);
    setRole(storedRole ?? "");
let isMounted = true
const control = new AbortController()
    // Получаем данные пользователя
   const fetchUserData = async () => {
    try {
      const response = await axios.get<FetchedData>(
        "http://localhost:5000/current-user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: control.signal,
        }
      );
      if (isMounted) {
        setUsername(response.data.username);
      }
    } catch (err) {
    
      const error = err as AxiosError<{ message?: string }>;
      if (isMounted) {
        setErrorMessage(
          error.response?.data?.message ||
            "Error fetching user data. Please log in again."
        );
        console.error("Error fetching user data:", error);
        navigate("/login");
      }
    }
  };

  fetchUserData();

  return () => {
    isMounted = false;
    control.abort();
  };
}, [token, storedRole]);

  const handleLogOut = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setRole("");
    setUsername("");
    navigate("/login");
  };

  return { handleLogOut, isLoggedIn, errorMessage, role, username };
}

export default useUserToken;
