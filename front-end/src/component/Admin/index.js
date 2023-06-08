import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './NabBar'
import Footer from '../Main/Footer'

const Admin = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Admin;