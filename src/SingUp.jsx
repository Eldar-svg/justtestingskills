import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SingUp() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "user",
  }); // Добавляем поле роли
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); 
const navigator = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        form,
        { withCredentials: true }
      );
      const { username, role } = response.data;

      console.log(username,role)
      setMessage("Registration successful! " + response.data.message);

      setTimeout(()=>{
        navigator("/login")
      },3000)


    } catch (err) {
      console.error(err);
      setMessage(
        "Registration failed: " + (err.response?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };



  return (
    <div>
      <h1>React JWT Authentication</h1>

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

        {message && <p>{message}</p>}
      </>
    </div>
  );
}

export default SingUp;
