import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo';
import { useUserContext } from '../Context/UserProvider';

const NavBar = () => {

  const {loggedIn, setLoggedIn, logout} = useUserContext();

  const showLogginOption = () => {
    if(loggedIn){
      return <button className="btn btn-danger px-3 me-2" onClick={logout}>Logout </button>
    }else{
      return <>
        <NavLink to="/main/login" type="button" className="btn btn-link px-3 me-2">
                Login
              </NavLink>
              <NavLink to="/main/signup" className="btn btn-primary me-3">
                Sign up for free
              </NavLink>
      </>
    }
  }

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {/* Container wrapper */}
        <div className="container">
          {/* Navbar brand */}
          <NavLink className="navbar-brand me-2" to="/main/home">
            <Logo title={'AI Browsy'} />
          </NavLink>
          {/* Toggle button */}
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarButtonsExample"
            aria-controls="navbarButtonsExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars" />
          </button>
          {/* Collapsible wrapper */}
          <div className="collapse navbar-collapse" id="navbarButtonsExample">
            {/* Left links */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/main/browser">
                  Browse AI Models
                </NavLink>
              </li>
            </ul>
            {/* Left links */}
            <div className="d-flex align-items-center">
              {showLogginOption()}
             
            </div>
          </div>
          {/* Collapsible wrapper */}
        </div>
        {/* Container wrapper */}
      </nav>
      {/* Navbar */}
    </>
  );
};

export default NavBar;
