import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <div>
        <footer className="text-center text-white" style={{ backgroundImage: 'linear-gradient(45deg, #505050, transparent)' }}>
          <div className="container p-2 pb-0">
            <section className="mb-4">
              <a
                className="btn btn-primary btn-floating m-1 rounded-circle"
                style={{ backgroundColor: '#3b5998' }}
                href="#!"
                role="button"
              ><i className="fab fa-facebook-f d-flex"></i></a>
              <a
                className="btn btn-primary btn-floating m-1 rounded-circle"
                style={{ backgroundColor: '#55acee' }}
                href="#!"
                role="button"
              ><i className="fab fa-twitter d-flex"></i></a>
              <a
                className="btn btn-primary btn-floating m-1 rounded-circle"
                style={{ backgroundColor: '#dd4b39' }}
                href="#!"
                role="button"
              ><i className="fab fa-google d-flex"></i></a>
              <a
                className="btn btn-primary btn-floating m-1 rounded-circle"
                style={{ backgroundColor: '#ac2bac' }}
                href="#!"
                role="button"
              ><i className="fab fa-instagram d-flex"></i></a>
              <a
                className="btn btn-primary btn-floating m-1 rounded-circle"
                style={{ backgroundColor: '#0082ca' }}
                href="#!"
                role="button"
              ><i className="fab fa-linkedin-in d-flex"></i></a>
              <Link
                className="btn btn-primary btn-floating m-1 rounded-circle"
                style={{ backgroundColor: '#333333' }}
                to="#!"
                role="button"
              ><i className="fab fa-github d-flex"></i></Link>
            </section>

          </div>
          <div className="text-center p-3" style={{ backgroundColor: 'rgb(0 0 0 / 46%)' }}>
            © 2020 Copyright:
            <Link className="text-white" to="/main/home/">AIBrowsey.com</Link>
          </div>

        </footer>

      </div>
    </>
  )
}

export default Footer