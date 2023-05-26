import React from "react";

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
      <div className="container d-flex mt-3">
        <div>
          <h1>AI Browsey</h1>
          <h2 className="small">Train a computer to recognize your own images, sounds, & poses.</h2>
          <p>A fast, easy way to create machine learning models for your sites, apps, and more no expertise or coding required.</p>
          <a href="/">
            <button type="submit">Get Started</button>
          </a>
          <div className="d-flex">
            <a href="https://www.tensorflow.org/js" className="mt-3">
              <img src="https://cdn.icon-icons.com/icons2/2699/PNG/512/tensorflow_logo_icon_168671.png" alt="TensorFlow" className="w-100" style={{ height: '3rem' }} />
            </a>
            <a href="https://ml5js.org/" className="mt-3">
              <img src="https://ml5js.org/static/ml5_logo_purple-88e082b8dc81d8729f95bcc092db90c5.png" alt="TensorFlow" className="w-100" style={{ height: '3rem' }} />
            </a>
            <a href="https://p5js.org/" className="mt-3">
              <img src="https://p5js.org/assets/img/p5js.svg" alt="TensorFlow" className="w-100" style={{ height: '3rem' }} />
            </a>
            <a href="https://www.tensorflow.org/js" className="mt-3">
              <img src="https://cdn.icon-icons.com/icons2/2699/PNG/512/tensorflow_logo_icon_168671.png" alt="TensorFlow" className="w-100" style={{ height: '3rem' }} />
            </a>
            <a href="https://coral.ai/" className="mt-3">
              <img src="https://cdn.iconscout.com/icon/free/png-256/free-framer-logo-3609961-3014601.png" alt="TensorFlow" className="w-100" style={{ height: '3rem' }} />
            </a>
            <a href="https://www.tensorflow.org/js" className="mt-3">
              <img src="https://cdn.icon-icons.com/icons2/2699/PNG/512/tensorflow_logo_icon_168671.png" alt="TensorFlow" className="w-100" style={{ height: '3rem' }} />
            </a>
          </div>
        </div>
        <div className="d-flex w-100" style={{ height: '15rem' }}>
          <video class="w-100" autoplay loop muted>
            <source src="https://mdbootstrap.com/img/video/animation-intro.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </>
  )
}

export default Home