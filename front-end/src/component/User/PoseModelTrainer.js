import React from "react";

const PoseModelTrainer = () => {
  return (
    <>
      <div className="d-flex mt-5">
        <div className="row w-100 m-0">
          <div className="col-md-4">
            <div
              className="pb-3 text-center"
              style={{ backgroundColor: "blue" }}
            >
              <h2>Upload Image</h2>
            </div>
            <div className="pb-3 d-flex justify-content-center mt-2 w-100">
              <label for="formFileMultiple" className="form-label">
                Multiple files input example
              </label>
              <input
                className="form-control"
                type="file"
                id="formFileMultiple"
                multiple
              />
            </div>

            <div className="row">
              <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
                  className="w-100 shadow-1-strong rounded mb-4"
                  alt="Boat on Calm Water"
                />

                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain1.webp"
                  className="w-100 shadow-1-strong rounded mb-4"
                  alt="Wintry Mountain Landscape"
                />
              </div>

              <div className="col-lg-4 mb-4 mb-lg-0">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain2.webp"
                  className="w-100 shadow-1-strong rounded mb-4"
                  alt="Mountains in the Clouds"
                />

                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
                  className="w-100 shadow-1-strong rounded mb-4"
                  alt="Boat on Calm Water"
                />
              </div>

              <div className="col-lg-4 mb-4 mb-lg-0">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(18).webp"
                  className="w-100 shadow-1-strong rounded mb-4"
                  alt="Waves at Sea"
                />

                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain3.webp"
                  className="w-100 shadow-1-strong rounded mb-4"
                  alt="Yosemite National Park"
                />
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div
              className="col-lg-4 mb-4 mb-lg-0 text-center w-100 pb-3"
              style={{ backgroundColor: "red" }}
            >
              <h2>class</h2>
            </div>
            <div className="row row-cols-4 g-3 pt-2">
              <div className="col">
                <div className="card">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp"
                    className="card-img-top"
                    alt="Hollywood Sign on The Hill"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">
                      This is a longer card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/new/standard/city/042.webp"
                    className="card-img-top"
                    alt="Palm Springs Road"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">
                      This is a longer card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/new/standard/city/043.webp"
                    className="card-img-top"
                    alt="Palm Springs Road"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">
                      This is a longer card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                  </div>
                </div>
              </div>
              <div className="card">
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/standard/city/050.webp"
                  className="card-img-top"
                  alt="Skyscrapers"
                />
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    This is a longer card with supporting text below as a
                    natural lead-in to additional content. This content is a
                    little bit longer.
                  </p>
                </div>
              </div>
            </div>
            <hr className="hr" />
            <div className="row">
              <div className="col text-center">
                <h2>Traning process</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PoseModelTrainer;
