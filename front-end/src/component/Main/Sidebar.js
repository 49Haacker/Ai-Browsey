import { stack as Menu } from 'react-burger-menu';
import React from 'react';
import './sidebar.css';
import { NavLink } from 'react-router-dom';
import { div } from '@tensorflow/tfjs';

const Sidebar = () => {
  return (
    <Menu>
      <div className="sidebar-item">
        <NavLink id="profile" className="menu-item" to="/Main/Home/">
          Home
        </NavLink>
      </div>
      <div className="sidebar-item">
        <NavLink id="profile" className="menu-item" to="/Main/Contact/">
          Contact Us
        </NavLink>
      </div>
      <div className="sidebar-item">
        <NavLink id="profile" className="menu-item" to="/Main/Browser/">
          Model Browser
        </NavLink>
      </div>
      <div className="sidebar-item">
        <NavLink id="profile" className="menu-item" to="/user/profile">
          User Profile
        </NavLink>
      </div>
      <div className="sidebar-item">
        <NavLink id="profile" className="menu-item" to="/Admin/adminProfile">
          Admin
        </NavLink>
      </div>

    </Menu>

  );
};

export default Sidebar;
