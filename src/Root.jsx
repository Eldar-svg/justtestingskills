import { useState,useEffect  } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Root() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    const storedRole = localStorage.getItem("role");
    setIsLoggedIn(token !== null);
    setUsername(storedUsername || "");
    setRole(storedRole || "");
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setUsername("");
    setRole("");
    navigate("/login");
  };

  return (
    <div>
      <ul style={{ listStyle: "none" }}>
        <button>
          <li>
            <Link style={{ textDecoration: "none" }} to={`/`}>
              About Us
            </Link>
          </li>
        </button>
        <button>
          <li>
            <Link style={{ textDecoration: "none" }} to={`/products`}>
              Products
            </Link>
          </li>
        </button>
        <button>
          <li>Contacts</li>
        </button>
        {isLoggedIn && <><button onClick={handleLogOut}>Logout</button>
         
          <div>
            <h3>Welcome to our website {username} you have role of {role}</h3>{" "}
          </div></>
         }
      </ul>
    </div>
  );
}

export default Root;
