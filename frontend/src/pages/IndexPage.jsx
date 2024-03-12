import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { Navigate } from "react-router-dom";

const IndexPage = () => {
  const { user, users, setUsers } = useContext(UserContext);
  const [isUpdate, setIsUpdate] = useState(false);
  const [redirect, setRedirect] = useState(false);
  let update = false;

  if (!user) return "";

  if (redirect) {
    return <Navigate to="/" />;
  }

  const handleUpdate = async (id) => {
    update = true;
    setIsUpdate(update);
    if (update) {
      await axios.put(`/api/users/updateUser/${id}`);
      await axios.get("/api/users/getUsers").then(({ data }) => {
        setUsers(data);
      });
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/users/deleteUser/${id}`);
    await axios.get("/api/users/getUsers").then(({ data }) => {
      setUsers(data);
    });
  };

  const handleLogout = async () => {
    await axios.post("/api/users/logout");
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <main className="w-full h-screen flex flex-col justify-center items-center gap-4">
      {users.length > 0 &&
        users.map((user, index) => (
          <div key={index} className="w-[90%] flex items-start justify-between">
            <h1>{user._id}</h1>
            <h1>{user.name}</h1>
            <h1>{user.email}</h1>
            <h1>{user.phone}</h1>
            <h1>{user.city}</h1>
            <button
              onClick={() => handleUpdate(user._id)}
              className="bg-green-400 text-white font-bold p-2 rounded-lg"
            >
              Update
            </button>
            <button
              onClick={() => handleDelete(user._id)}
              className="bg-red-700 text-white font-bold p-2 rounded-lg"
            >
              X
            </button>
          </div>
        ))}
      <button
        onClick={handleLogout}
        className="bg-blue-400 text-white font-bold p-2 rounded-lg"
      >
        Logout
      </button>
    </main>
  );
};

export default IndexPage;
