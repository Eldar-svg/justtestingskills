import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Root() {
  const navigate = useNavigate()
    const handleLogOut = () => {
      localStorage.removeItem('token');  
      localStorage.removeItem('login')
      navigate('/login');   
    };
const username = localStorage.getItem('login')
    const isLoggedIn = localStorage.getItem("token") !== null;

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
       {isLoggedIn ?  <button onClick={handleLogOut}>
      Logout
        </button>: null}
      {isLoggedIn  ?  <div><h4>Welcome to our website {username}</h4>  </div>: null} 
      </ul>
    </div>
  );
}

export default Root;
