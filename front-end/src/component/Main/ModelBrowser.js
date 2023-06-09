import React from "react";
import { Link } from "react-router-dom";

const ModelBrowser = () => {
  return (
    <>
      <div
        className="container d-flex justify-content-center flex-column w-75"
        style={{ marginTop: "9rem" }}
      >
        <h1 className="fw-bolder " style={{ fontSize: "4em" }}>
          New Project
        </h1>
        <div className="container d-flex mt-5">
          <Link
            to="/user/imageModelTrainer/"
            className="text-decoration-none text-black"
          >
            <div
              className="card"
              style={{ width: "27rem", margin: "0px 33px 0 0" }}
            >
              <img
                src="https://images.pexels.com/photos/196667/pexels-photo-196667.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h2>Image Project</h2>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </Link>
          <Link to="/user/ToxicityTrainer/" className="text-decoration-none text-black">
            <div
              className="card"
              style={{ width: "27rem", margin: "0px 33px 0 0" }}
            >
              <img
                src="https://images.pexels.com/photos/196667/pexels-photo-196667.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h2>Toxicity</h2>
                <p className="card-text">
                  Teach based on images, from files or your webcam.
                </p>
              </div>
            </div>
          </Link>
          <Link to="/user/PoseModelTrainer/" className="text-decoration-none text-black">
            <div
              className="card"
              style={{ width: "27rem", margin: "0px 33px 0 0" }}
            >
              <img
                src="https://images.pexels.com/photos/196667/pexels-photo-196667.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h2>Pose Project</h2>
                <p className="card-text">
                  Teach based on images, from files or your webcam.
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div
          className="card"
          style={{
            width: "20rem",
            margin: "67px 0px 0 0",
            marginBottom: "63px",
          }}
        >
          <div className="card-body">
            <h2 className="fs-4">More comming soon</h2>
            <p className="card-text mt-5">
              More models will appear here as they’re developed.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModelBrowser;
