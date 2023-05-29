import React from "react";
import "./home.css";
import { Link } from "react-router-dom";

// import image
// import fstImage from '../../Image/fstImage.jpg'
// import secondImage from '../../Image/secondImage.jpg'
// import thrdImage from '../../Image/thrdImage.jpg'
// import forthImage from '../../Image/forthImage.jpg'
// import fiveImage from '../../Image/fiveImage.jpg'
// import sixImage from '../../Image/sixImage.jpg'

const Home = () => {
  return (
    <>
      <div className="container d-flex mt-3 w-75 flexRevrse">
        <div style={{ padding: "0 113px" }}>
          <h1
            className="RfontSize"
            style={{ fontSize: "4.775em", marginBottom: "33px" }}
          >
            AI Browsey
          </h1>
          <h2 className="fw-bolder" style={{ marginBottom: "33px" }}>
            Train a computer to recognize your own images, sounds, & poses.
          </h2>
          <p
            className="fw-normal"
            style={{ fontSize: "1.385em", marginBottom: "33px" }}
          >
            A fast, easy way to create machine learning models for your sites,
            apps, and more no expertise or coding required.
          </p>
          <Link to="/main/browser/">
            <button type="button" className="btn btn-primary">
              Get Started
            </button>
          </Link>
          <div className="d-flex">
            <Link
              to="https://www.tensorflow.org/js"
              className="mt-3 svg-icon-img"
            >
              <img
                src="https://cdn.icon-icons.com/icons2/2699/PNG/512/tensorflow_logo_icon_168671.png"
                alt="TensorFlow"
                className="w-100"
              />
            </Link>
            <Link to="https://ml5js.org/" className="mt-3 svg-icon-img">
              <img
                src="https://ml5js.org/static/ml5_logo_purple-88e082b8dc81d8729f95bcc092db90c5.png"
                alt="TensorFlow"
                className="w-100"
              />
            </Link>
            <Link to="https://p5js.org/" className="mt-3 svg-icon-img">
              <img
                src="https://p5js.org/assets/img/p5js.svg"
                alt="TensorFlow"
                className="w-100"
              />
            </Link>
            <Link to="https://www.framer.com/" className="mt-3 svg-icon-img">
              <img
                src="https://cdn.iconscout.com/icon/free/png-256/free-framer-logo-3609961-3014601.png"
                alt="TensorFlow"
                className="w-100"
              />
            </Link>
            <Link to="https://nodejs.org/en" className="mt-3 svg-icon-img">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6QgL46k3chitOCQHOHCOvyGBZDZY8ZvO6dwQO1CsB0w&s"
                alt="TensorFlow"
                className="w-100"
              />
            </Link>
          </div>
        </div>
        <div className="d-flex" style={{ height: "36rem" }}>
          <video
            src="https://teachablemachine.withgoogle.com/assets/prediction.mp4"
            autoPlay
            muted
            loop
            type="video/mp4"
          ></video>
        </div>
      </div>

      <div div className="container mt-secon-div d-flex flex-column">
        <h1 className="text-center" id="posterImage">
          What is Teachable Machine?
        </h1>
        <div class="embed-responsive embed-responsive-21by9 d-flex justify-content-center mt-5 height-main-video">
          <iframe
            id="mainVideo"
            class="embed-responsive-item"
            width="100%"
            height="auto"
            src="https://www.youtube-nocookie.com/embed/T2qQGqZxkD0?start=1"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
        <p className="mt-5 fw-bolder text-center">
          Teachable Machine is a web-based tool that makes creating machine
          learning models fast, easy, and accessible to everyone. (Note: you can
          find the{" "}
          <Link to="https://teachablemachine.withgoogle.com/v1">
            {" "}
            first version of Teachable Machine from 2017 here.)
          </Link>
        </p>
      </div>
    </>
  );
};

export default Home;
