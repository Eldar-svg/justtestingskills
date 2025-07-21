import { Link } from "react-router-dom";
import useUserToken from "./hooks/useUserToken";

function Root(): JSX.Element {
  const { role, username, isLoggedIn, errorMessage, handleLogOut } = useUserToken();

  return (
    <div className="flex relative w-full">
      <ul className="flex justify-between items-center bg-red-300 bg-opacity-100 w-full  max-h-[100px] p-5 mt-[60px] space-x-7">
        {/* Левый блок: About Us и Products */}
        <div className="flex space-x-7">
          <li>
            <Link className="mainbtn" to="/">
              About Us
            </Link>
          </li>
          <li>
            <Link className="mainbtn" to="/products">
              Products
            </Link>
          </li>
        </div>

        {/* Центральный блок: Логотип */}
        <li className="w-[400px] ">
          <img
            src="./coffee-shop-logos-design-template.jpg"
            alt="Coffee Shop Logo"
            className="rounded-full mx-[120px]  w-[200px] shadow-2xl"
          />
        </li>

        {/* Правый блок: Пользователь и кнопка */}
        <div className="flex items-center space-x-4">
          {isLoggedIn && (
            <li className="text-center rounded-lg shadow-lg bg-white p-4 text-black">
              Welcome {username || "guest"}! <p>You have role: {role}</p>
            </li>
          )}
          {errorMessage && <div className="text-black">{errorMessage}</div>}
          
          <button
            onClick={handleLogOut}
            className="bg-green-400 text-black hover:bg-red-400 px-5 py-2 rounded-lg shadow-xl"
          >
            {isLoggedIn ? (
              "Logout"
            ) : (
              <Link className="text-black no-underline" to="/login">
                Log In
              </Link>
            )}
          </button>
        </div>
      </ul>
    </div>
  );
}

export default Root;