import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg sticky-top" style={{ background: 'linear-gradient(90deg, rgb(28 80 42) 0%, rgb(1 1 72) 22%, rgb(140 51 178) 91%)' }}>
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                    <Link className="navbar-brand mt-2 mt-lg-0" to="/">
                        <img src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp" height="15" alt="MDB Logo" loading="lazy" />
                    </Link>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul className="navbar-nav ms-auto d-flex">
                            <li className="nav-item">
                                <Link className="nav-link txt-color" to="/main/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link txt-color" to="/main/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link txt-color" to="/main/signup">Signup</Link>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>
        </>
    )
}

export default NavBar