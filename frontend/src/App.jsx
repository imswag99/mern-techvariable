import React from 'react'
import { Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import IndexPage from './pages/IndexPage'
import axios from 'axios';

const App = () => {
  axios.defaults.baseURL = "http://localhost:5000";
  axios.defaults.withCredentials = true;


  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/home' element={<IndexPage />} />
    </Routes>
  )
}

export default App