import React from 'react';
import { Link } from 'react-router-dom';

const ModelBrowser = () => {
  return (
    <>
      <div className="container-fluid d-flex justify-content-center flex-column" style={{ marginTop: '9rem' }}>
        <h1 className="fw-bolder " style={{ fontSize: '4em' }}>
          Select Model to Train
        </h1>
        <div className="container-fluid mt-5">
          <div className="row">
            <div className="col-md-3">
              <a href="http://localhost:3001" className="text-decoration-none text-black">
                <div className="card">
                  <img src="https://docs-assets.developer.apple.com/published/981240227d/c0ddbd6a-b60d-4a32-9726-6a9df5d7fbb9.png" className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h2>Image Model</h2>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-3">
              <Link to="/user/TextModelTrainer/" className="text-decoration-none text-black">
                <div className="card">

                  <img src="https://miro.medium.com/v2/resize:fit:1200/1*PIs25RW-zFYGalzlzgdI9A.jpeg" className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h2>Toxicity Model</h2>
                    <p className="card-text">Teach based on images, from files or your webcam.</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/user/PoseModelTrainer/" className="text-decoration-none text-black">
                <div className="card">
                  <img src="https://media.licdn.com/dms/image/D5612AQHW5HtOxoRKlg/article-cover_image-shrink_600_2000/0/1681285456609?e=2147483647&v=beta&t=hZKdxdeOaAJbBjOp131sQmdmw79Kl-CG2Lt9uQCOfN8" className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h2>Pose Model</h2>
                    <p className="card-text">Teach based on images, from files or your webcam.</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/user/AudioTrainer" className="text-decoration-none text-black">
                <div className="card">
                  <img src="https://images.ctfassets.net/3viuren4us1n/7MmrorOl3fJ8QhDi6jxrpW/1bd31debd4111a143bd48e2d75e394f8/audio_classification.jpg" className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h2>Audio Speech Model</h2>
                    <p className="card-text">Teach custom speech recognition models</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModelBrowser;
