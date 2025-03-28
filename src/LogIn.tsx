import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios,{AxiosError} from "axios";
import { useForm } from "react-hook-form";
import "./App.css";

interface FormData {
  username:string,
  password:string
}
interface FormResponse{
  role:string,
  token:string
}

const LogIn:React.FC=()=>{
  
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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

  const navigate = useNavigate();

  useEffect(() => {
    setFocus("username");
  }, [setFocus]);

  const handleLogin= async (data:FormData):Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.post<FormResponse>("http://localhost:5000/login", data);
      const { token, role } = response.data;

      // Если сервер не возвращает username, можно не устанавливать его в localStorage.
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      
      console.log(token);
      setMessage(`Logged in successfully as ${role}`);

      // Навигация в зависимости от роли
      if (role === "admin") {
        navigate("/products");
      } else {
        navigate("/");
      }
    } catch (err) {
      const errorMessage =
        (err as AxiosError<{ message?: string }>).response?.data?.message ||
        (err as Error).message ||
        "An unknown error occurred";
      setMessage(`Login failed: ${errorMessage}`);
      console.error("Login error: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(handleLogin)}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            flexDirection: "column",
            flex: "1",
          }}
        >
          <h2>Login</h2>
          <input
            {...register("username", { required: "Username is required" })}
            type="text"
            placeholder="Username"
          />
          {errors.username && <p>{errors.username.message}</p>}

          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="Password"
          />
          {errors.password && <p>{errors.password.message}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {message && <p>{message}</p>}
          <NavLink to="/signup">
            <button type="button">Sign Up</button>
          </NavLink>
        </div>
      </form>
    </div>
  );
}
 
export default LogIn;
