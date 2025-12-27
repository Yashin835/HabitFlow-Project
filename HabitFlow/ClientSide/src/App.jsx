import { useState } from 'react'
import './App.css'
import Homepage from './Pages/HomePage/Index'
import RegisterPage from './Pages/LoginPage/Register.jsx'
import LoginPage from './Pages/LoginPage/Login.jsx'
import Product from './Pages/WebApp/Product.jsx'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path='/app' element={<Product />}></Route >
        </Routes>
      </BrowserRouter >
    </>
  )
}

export default App
