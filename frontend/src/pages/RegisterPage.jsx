import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    await axios.post('/api/users/register', {
      name,
      email,
      password,
      phone,
      city
    });

    setRedirect(true);
  }

  if(redirect){
    return <Navigate to="/" />
  }


  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-5xl mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="w-[40%] h-[60%] flex flex-col border border-black gap-6 justify-center p-4">
        <input
          className="border pl-2 py-1 border-black text-sm"
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <input
          className="border pl-2 py-1 border-black text-sm"
          type="text"
          placeholder="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          className="border pl-2 py-1 border-black text-sm"
          type="text"
          placeholder="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" className="bg-blue-400 text-white font-bold py-1 rounded-lg">
          Register
        </button>
      </form>
      <div>
        Already registered?{" "}
        <Link
          to="/"
          className="text-blue-600 underline underline-offset-2"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
