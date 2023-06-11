import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './NavBar'
import Footer from './Footer'
import Sidebar from './Sidebar'

const Main = () => {
    return (
        <div>
            <Navbar />
            <Sidebar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Main