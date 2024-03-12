import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext);

  const handleLogin = async (ev) => {
    ev.preventDefault();

    const {data} = await axios.post('/api/users/login', {
      email, password
    });

    setUser(data);
    setRedirect(true);
  }

  if(redirect) {
    return <Navigate to="/home" />
  }


  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-5xl mb-4">Login</h1>
      <form onSubmit={handleLogin} className="w-64 h-64 flex flex-col border border-black gap-6 justify-center p-4">
      <input
          className="border pl-2 py-1 border-black text-sm"
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border pl-2 py-1 border-black text-sm"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue-400 text-white font-bold py-1 rounded-lg">
          Login
        </button>
      </form>
      <div>
        New here?{" "}
        <Link
          to="/register"
          className="text-blue-600 underline underline-offset-2"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
