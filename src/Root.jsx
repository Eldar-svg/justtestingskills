import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Root() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/current-user", {
          headers: {
            Authorization: `Bearer ${token}`,  // Отправляем токен
          },
        });
        setUsername(response.data.username);  // Устанавливаем имя пользователя
      } catch (err) {
        setErrorMessage("Error fetching user data. Please log in again.");
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setRole("");
    setUsername("");
    navigate("/login");
  };

  return (
    <div
   
  >
      <ul  style={{
      maxWidth:"100%", // Максимальная ширина
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px", // Отступы между элементами
      flexWrap: "wrap", // Позволяет переносить элементы, если не помещаются
      flexDirection:"row",
      listStyle:"none"
    }}>
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
        <h3  >Welcome {username || "guest"}! Role: {role}</h3>
        {isLoggedIn && (
         
            <button  onClick={handleLogOut}>Logout</button>
            
         
        )}
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      </ul>
    </div>
  );
}

export default Root;
