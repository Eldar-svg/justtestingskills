
import axios, { AxiosError }   from 'axios';
import { FormResponse } from '../LogIn';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormData } from '../LogIn';
export interface LogInProp {
  message: string,
  loading:boolean,
  handleLogin: (data: FormData)=>Promise<void>
}

const useLogInHook = ():LogInProp  => {
  const navigate= useNavigate()
    
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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
  return {message,loading,handleLogin}
}

export default useLogInHook