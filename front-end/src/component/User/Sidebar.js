import { stack as Menu } from 'react-burger-menu';
import React from 'react';
import './sidebar.css';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Menu>
      <div className="sidebar-item">
        <NavLink id="profile" className="menu-item" to="/Main/Home/">
          Home
        </NavLink>
      </div>
      <div className="sidebar-item">
        <a id="profile" className="menu-item" href="http://localhost:3001/">
          Image Model Trainer
        </a>
      </div>
      {/* <div className="sidebar-item">
        <NavLink id="profile" className="menu-item" to="/user/PoseModelTrainer/">
          Pose Model Trainer
        </NavLink>
      </div>
      <div className="sidebar-item">
        <NavLink id="profile" className="menu-item" to="/user/PoseTrainer/">
          Pose Trainer
        </NavLink>
      </div>
      <div className="sidebar-item">
        <NavLink id="profile" className="menu-item" to="/user/ToxicityTrainer/">
        ToxicityTrainer
        </NavLink>
      </div> */}
      <div className="sidebar-item">
        <NavLink id="profile" className="menu-item" to="/user/textModelTrainer/">
          Text Classifier
        </NavLink>
      </div>
      <div className="sidebar-item">
        <NavLink id="profile" className="menu-item" to="/user/poseModelTrainer/">
          Pose Model
        </NavLink>
      </div>
      <div className="sidebar-item">
        <NavLink id="profile" className="menu-item" to="/user/AudioTrainer/">
          Audio Model Trainer
        </NavLink>
      </div>
    </Menu>
  );
};

export default Sidebar;
