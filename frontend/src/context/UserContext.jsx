import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const UserContext = createContext();

export const UserContextProvider = ({children}) => {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('/api/users/profile').then(({data}) => {
      setUser(data);
    })
  }, []);

  useEffect(() => {
    axios.get('/api/users/getUsers').then(({data}) => {
      setUsers(data);
    })
  }, [users])

  return (
    <UserContext.Provider value={{user, setUser, users, setUsers}}>
      {children}
    </UserContext.Provider>
  )
}