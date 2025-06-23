import { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { useForm } from "react-hook-form";

import useLogInHook from "./hooks/useLogInHook";
export interface FormData {
  username: string;
  password: string;
}
export interface FormResponse {
  role: string;
  token: string;
}

const LogIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { message, loading, handleLogin } = useLogInHook();
  useEffect(() => {
    setFocus("username");
  }, [setFocus]);
  

  return (
    <div className="backgound">
      <h2 className=" bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-5xl font-extrabold text-transparent  ">
        Welcome to website!
      </h2>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="flex flex-col justify-center items-center bg-red-900 text-white min-w-[600px] p-6 m-6 gap-5 rounded-lg   shadow-2xl">
          <img
            src="./coffee-shop-logos-design-template-cda8575e146cc5ba17cd3c1a24d65ba1_screen.jpg"
            alt="alt"
            className="rounded-[600px] 
 max-w-[240px] mt-9 shadow-xl mask-origin-border "
          />

          <input
            className="input"
            {...register("username", { required: "Username is required" })}
            type="text"
            placeholder="Username"
          />
          {errors.username && <p>{errors.username.message}</p>}

          <input
            className="input"
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="Password"
          />
          {errors.password && <p>{errors.password.message}</p>}

          <button className="btn" type="submit" disabled={loading}>
          
            {loading ? "Logging in..." : "Login"}
          </button>

          {message && <p>{message}</p>}
          <NavLink to="/signup">
            <button className="btn" type="button">
              Sign Up
            </button>
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
