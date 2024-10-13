import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
 
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import "./App.css";
function LogIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
  });
  const truelogin = "admin";
  const truepassword = "admin1";
 
  const navigate = useNavigate()
 
   
  useEffect(() => {
    setFocus("login");  // Устанавливаем фокус на поле "login"
  }, [setFocus]);

  const handlersub = (data) => {
    if (truelogin === data.login && truepassword === data.password) {
      localStorage.setItem("token", true);
      localStorage.setItem("username", data.login);
      navigate("/products");
    } else {
      alert("Incorrect login or password");
    }
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit(handlersub)}>
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
          
            <label>Login:</label>
            <input
              {...register("login", { required: "username is required" })}
              type="text"
               
            />
            {errors.username && <p>{errors.username.message}</p>}
          
       
           
            <label>Password:</label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
            />
            {errors.password && <p>{errors.password.message}</p>}
          
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default LogIn;
