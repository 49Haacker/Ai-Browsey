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
        <div className="resHomePadding" style={{ padding: "0 113px" }}>
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
        <div className="d-flex resHeightHomeVide" style={{ height: "36rem" }}>
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
          What is AI Browsey?
        </h1>
        <div className="embed-responsive embed-responsive-21by9 d-flex justify-content-center mt-5 height-main-video">
          <iframe
            id="mainVideo"
            className="embed-responsive-item"
            width="100%"
            height="auto"
            src="https://www.youtube-nocookie.com/embed/T2qQGqZxkD0?start=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <div className="rwo d-flex justify-content-center align-items-center w-50 m-auto">
          <p className="mt-5 fw-bolder text-center">
            AI Browsey is a web-based tool that makes creating machine
            learning models fast, easy, and accessible to everyone. (Note: you
            can find the{" "}
            <Link to="https://teachablemachine.withgoogle.com/v1">
              {" "}
              first version of Teachable Machine from 2017 here.)
            </Link>
          </p>
        </div>
      </div>

      <div
        className="container d-flex justify-content-center align-items-center flex-column"
        style={{ marginTop: "17rem" }}
      >
        <h1>How do I use it?</h1>
        <div class="row row-cols-3 g-3 mt-5 w-75">
          <div class="col">
            <div class="card h-100">
              <img
                src="https://teachablemachine.withgoogle.com/assets/img/contentpage/home/collect.svg"
                class="card-img-top"
                alt="Hollywood Sign on The Hill"
              />
              <div class="card-body">
                <h1 class="card-title">Gather</h1>
                <p class="card-text">
                  Gather and group your examples into classes, or categories,
                  that you want the computer to learn.
                </p>
                <Link to="">
                  Video: Gather samples
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-play-circle"
                    viewBox="0 0 16 16"
                    style={{ margin: "0 13px" }}
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card h-100">
              <img
                src="https://teachablemachine.withgoogle.com/assets/img/contentpage/home/train.svg"
                class="card-img-top"
                alt="Palm Springs Road"
              />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <Link to="">
                  Video: Train your model
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-play-circle"
                    viewBox="0 0 16 16"
                    style={{ margin: "0 13px" }}
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card align-items-end h-100">
              <img
                src="https://teachablemachine.withgoogle.com/assets/img/contentpage/home/export.svg"
                class="card-img-top"
                alt="Los Angeles Skyscrapers"
              />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content.
                </p>
                <Link to="">
                  Video: Export your model
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-play-circle"
                    viewBox="0 0 16 16"
                    style={{ margin: "0 13px" }}
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="container-lg d-flex justify-content-center align-items-center flex-column"
        style={{ marginTop: "17rem" }}
      >
        <h1>What can I use to teach it?</h1>
        <p className="mt-5 fw-bolder text-center w-50">
          Teachable Machine is flexible – use files or capture examples live.
          It’s respectful of the way you work. You can even choose to use it
          entirely on-device, without any webcam or microphone data leaving your
          computer.
        </p>
        <div class="row row-cols-3 g-3 mt-5 w-75">
          <div class="col">
            <div class="card">
              <img
                src="https://teachablemachine.withgoogle.com/assets/img/contentpage/home/teach-images.png"
                class="card-img-top"
                alt="Hollywood Sign on The Hill"
              />
              <div class="card-body">
                <h1 class="card-title">Images</h1>
                <p class="card-text">
                  Teach a model to classify images using files or your webcam.
                </p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card h-100">
              <img
                src="https://teachablemachine.withgoogle.com/assets/img/contentpage/home/teach-sounds.png"
                class="card-img-top"
                alt="Palm Springs Road"
              />
              <div class="card-body">
                <h5 class="card-title">Sounds</h5>
                <p class="card-text">
                  Teach a model to classify audio by recording short sound
                  samples.
                </p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card align-items-end">
              <img
                src="https://teachablemachine.withgoogle.com/assets/img/contentpage/home/teach-poses.png"
                class="card-img-top"
                alt="Los Angeles Skyscrapers"
              />
              <div class="card-body">
                <h5 class="card-title">Poses</h5>
                <p class="card-text">
                  Teach a model to classify body positions using files or
                  striking poses in your webcam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
