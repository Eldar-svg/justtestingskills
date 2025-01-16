import React, { useState } from "react";
import axios from "axios";

function SingUp() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/register", form, { withCredentials: true });
      setMessage("Registration successful! " + response.data.message);
    } catch (err) {
      console.error(err);
      setMessage("Registration failed: " + (err.response?.message || err.message));
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const {data} = await axios.post("http://localhost:5000/login", form, { withCredentials: true });
      const token = data.token;
      localStorage.setItem("token", token);
      setToken(token);
      setMessage("Logged in successfully");
    } catch (err) {
      setMessage("Login failed: " + (err.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setMessage("Logged out");
  };

  return (
    <div>
      <h1>React JWT Authentication</h1>
      {!token ? (
        <>
          <form onSubmit={handleRegister}>
            <h2>Register</h2>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </>
      ) : (
        <div>
          <h2>Welcome!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default SingUp;
