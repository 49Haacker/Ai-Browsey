import React from 'react';
import './login.css';
import {useFormik} from 'formik';

const Login = () => {

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (value) => {
      console.log(value);
    }
  });

  return (
    <>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sampleimage" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={loginForm.handleSubmit}>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                  <button type="button" className="btn btn-primary btn-floating mx-1 custom-btn">
                    <i className="fab fa-facebook-f"></i>
                  </button>

                  <button type="button" className="btn btn-primary btn-floating mx-1 custom-btn">
                    <i className="fab fa-twitter"></i>
                  </button>

                  <button type="button" className="btn btn-primary btn-floating mx-1 custom-btn">
                    <i className="fab fa-linkedin-in"></i>
                  </button>
                </div>

                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">Or</p>
                </div>

                {/* <!-- Email input --> */}
                <div className=" mb-4">
                  <label className="form-label" for="form3Example3">
                    Email address
                  </label>
                  <input type="email" id="email" onChange={loginForm.handleChange} value={loginForm.values.email} className="form-control form-control-lg" placeholder="Enter a valid email address" />
                </div>

                {/* <!-- Password input --> */}
                <div className=" mb-3">
                  <label className="form-label" for="form3Example4">
                    Password
                  </label>
                  <input type="password" id="password" onChange={loginForm.handleChange} value={loginForm.values.password} className="form-control form-control-lg" placeholder="Enter password" />
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  {/* <!-- Checkbox --> */}
                  <div className="form-check mb-0">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                    <label className="form-check-label" for="form2Example3">
                      Remember me
                    </label>
                  </div>
                  <a href="#!" className="text-body">
                    Forgot password?
                  </a>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button type="submit" className="btn btn-primary btn-lg" style={{ paddingLeft: '2.5rem; padding-right: 2.5rem' }}>
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{' '}
                    <a href="#!" className="link-danger">
                      Register
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
