import React from 'react'

const Footer = () => {
  return (
    <>
      <div className="mt-5">
        <footer className="bg-light text-center text-white">
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
              <a
                className="btn btn-primary btn-floating m-1 rounded-circle"
                style={{ backgroundColor: '#333333' }}
                href="#!"
                role="button"
              ><i className="fab fa-github d-flex"></i></a>
            </section>

          </div>
          <div className="text-center p-3" style={{ backgroundColor: 'rgb(0 0 0 / 46%)' }}>
            © 2020 Copyright:
            <a className="text-white" href="https://mdbootstrap.com/">AIBrowsey.com</a>
          </div>

        </footer>

      </div>
    </>
  )
}

export default Footer