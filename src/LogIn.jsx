import React from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import "./App.css";
function LogIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
  });
  const users = [
    { login: "admin", password: "admin1", role: "admin" },
    { login: "user", password: "user1", role: "user" },
  ];
  console.log(users.login)

  const navigate = useNavigate();

  useEffect(() => {
    setFocus("login");
  }, [setFocus]);

  const handlersub = (data) => {
    const authenticatedUser = users.find(
      (user) => user.login === data.login && user.password === data.password
    );

    if (authenticatedUser) {
      
      localStorage.setItem("token", true);
      localStorage.setItem("username", authenticatedUser.login);
      localStorage.setItem("role", authenticatedUser.role);

  
      if (authenticatedUser.role === "admin") {
        navigate("/products");
      } else { navigate("/products");}
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
            {...register("login", { required: "Username is required" })}
            type="text"
          />
          {errors.login && <p>{errors.login.message}</p>}

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
