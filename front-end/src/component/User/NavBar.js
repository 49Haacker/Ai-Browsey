import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar sticky-top navWidthCstom" data-bs-theme="dark">
      <div className="container-fluid d-flex">
        {/* <Link className="navbar-brand text-white navLinkFontSize" to="/main/home/">
          AI Browsey
        </Link> */}
        {/* <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button> */}
        <button
          className="navbar-toggler d-flex justify-content-center align-items-center"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasWithBothOptions"
          aria-controls="offcanvasWithBothOptions"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
          <Link
            className="navbar-brand text-white navLinkFontSize resBtnNavbarMrgin"
            style={{ margin: "0px 74px" }}
          >
            AI Browsey
          </Link>
        </button>

        <div
          className="offcanvas offcanvas-start"
          data-bs-scroll="true"
          tabIndex="-1"
          id="offcanvasWithBothOptions"
          aria-labelledby="offcanvasWithBothOptionsLabel"
          style={{
            background:
              "linear-gradient(90deg, rgb(28 80 42) 0%, rgb(1 1 72) 22%, rgb(140 51 178) 91%)",
          }}
        >
          <div className="offcanvas-header">
            <h5
              className="offcanvas-title navLinkFontSize text-white"
              id="offcanvasWithBothOptionsLabel"
            >
              AI Browsey
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body navAllLinkFontSize">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/main/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-white"
                  href="http://localhost:5500"
                >
                  ImageModel Trainer
                </a>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white"
                  to="/user/poseModelTrainer"
                >
                  Pose Model Trainer
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/user/text">
                  ToxicityTrainer
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/user/AudioTrainer">
                AudioTrainer
                </Link>
              </li>
            </ul>
            <form className="d-flex mt-3" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success text-white"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
