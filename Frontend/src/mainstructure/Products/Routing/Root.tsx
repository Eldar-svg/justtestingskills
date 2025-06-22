import { Link } from "react-router-dom";
 
import useUserToken from "../../../../hooks/useUserToken";
 
function Root(): JSX.Element {
  const { role, username, isLoggedIn, errorMessage, handleLogOut } =
    useUserToken();

    console.log(role,username)
    console.log(isLoggedIn)
  return (
    <div className="w-full  ">
      <div className=" flex  ">
        <ul className=" relative flex bg-opacity-[70%] bg-red-300 w-full p-1  mb-5 mt-10 gap-1 items-center ">
          <li className="rootbtn">
            <Link style={{ textDecoration: "none" }} to={`/`}>
              About Us
            </Link>
          </li>
          <li className="rootbtn">
            <Link style={{ textDecoration: "none" }} to={`/products`}>

              Products
            </Link>
          </li>
          <li className="rootbtn">Contacts</li>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-[600px] max-w-[200px] shadow-xl ">
            <img 
              src="./coffee-shop-logos-design-template-cda8575e146cc5ba17cd3c1a24d65ba1_screen.jpg"
              alt="alt"
              className="rounded-[600px]  max-w-[240px] mt-9 shadow-xl"
            />
          </div>
          {isLoggedIn && (
            <li className=" text-center rounded-lg shadow-lg bg-white m-5 p-5 text-black ml-auto gap-1">
              Welcome {username }! <p>You Have role: {role}</p>
            </li>
          )}
          {errorMessage && <div className="text-black">{errorMessage}</div>}

          <button
            onClick={handleLogOut}
            className="bg-green-400 text-black hover:bg-red-400 p-5 m-5 rounded-lg shadow-xl"
          >
            {isLoggedIn ? (
              "Logout"
            ) : (
              <Link style={{ textDecoration: "none" }} to={`/login`}>
                Log In
              </Link>
            )}
          </button>
        </ul>
      </div>
    </div>
  );
}

export default Root;
