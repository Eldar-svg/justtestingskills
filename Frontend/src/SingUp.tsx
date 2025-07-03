import React, { useState } from "react";
import axios, { AxiosError } from "axios";
 
import { useNavigate } from "react-router-dom";

interface SingUpDate {
  username: string;
  password: string;
  role?: string;
}

interface SignUpResponse {
  username: string;
  role: string;
  message?: string; // Опциональное поле для сообщения от сервера
}

const SingUp: React.FC = () => {
  const [form, setForm] = useState<SingUpDate>({
    username: "",
    password: "",
    role: "user",
  }); // Добавляем поле роли
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigator = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post<SignUpResponse>(
        "http://localhost:5000/register",
        form,
        { withCredentials: true }
      );
      const { username, role } = response.data;

      console.log(username, role);
      setMessage("Registration successful! " + response?.data?.message);

      setTimeout(() => {
        navigator("/login");
      }, 3000);
    } catch (err) {
      console.error(err);
      const Errors = (err as AxiosError<{ message?: string }>).response?.data
        .message;
      setMessage(`Registration failed:  ${Errors}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white min-h-screen justify-center items-center  ">
      <h1 className="uppercase text-4xl font-extrabold ">
        Sing Up Our Web Site
      </h1>

      <>
        <div className="">
          <form
            className="flex text-xl text-white  rounded-b-full flex-col pt-[50px] pb-[50px] m-8 bg-amber-600  min-w-[400px] gap-4 items-center  "
            onSubmit={handleRegister}
          >
            <h2>Fill the inputs</h2>
            <input
              className="input"
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
            />
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
        {message && <p className="text-5xl text-green-700">{message}</p>}
      </>
    </div>
  );
};

export default SingUp;
