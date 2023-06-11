import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './NavBar'
import Footer from '../Main/Footer'
import Sidebar from './Sidebar'

const User = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default User;