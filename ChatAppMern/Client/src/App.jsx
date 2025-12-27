import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import './App.css'

export default function App() {
  return (
    <div className='w-full h-screen bg-[url("/Projects/ChatAppMern/Client/src/assets/bgImage.svg")] bg-cover bg-center bg-red-950'>
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </div>
  )
}