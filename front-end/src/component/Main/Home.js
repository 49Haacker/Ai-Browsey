import React, { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './style.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper';


const Home = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <div id="carouselDarkVariant" class="carousel slide carousel-fade carousel-dark" data-mdb-ride="carousel">
          <SwiperSlide>
            <div>
              <img alt="sildeImage" src="https://mdbcdn.b-cdn.net/img/new/slides/041.webp" />
              <div class="carousel-caption d-none d-md-block text-black fw-bolder">
                <h5>First slide label</h5>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <img alt="sildeImage" src="https://mdbcdn.b-cdn.net/img/new/slides/042.webp" class="d-block w-100" />
              <div class="carousel-caption d-none d-md-block text-black fw-bolder">
                <h5>Second slide label</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <img alt="sildeImage" src="https://mdbcdn.b-cdn.net/img/new/slides/043.webp" class="d-block w-100" />
              <div class="carousel-caption d-none d-md-block text-black fw-bolder">
                <h5>Third slide label</h5>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <img alt="sildeImage" src="https://mdbcdn.b-cdn.net/img/new/slides/041.webp" />
              <div class="carousel-caption d-none d-md-block text-black fw-bolder">
                <h5>First slide label</h5>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <img alt="sildeImage" src="https://mdbcdn.b-cdn.net/img/new/slides/042.webp" class="d-block w-100" />
              <div class="carousel-caption d-none d-md-block text-black fw-bolder">
                <h5>Second slide label</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <img alt="sildeImage" src="https://mdbcdn.b-cdn.net/img/new/slides/043.webp" class="d-block w-100" />
              <div class="carousel-caption d-none d-md-block text-black fw-bolder">
                <h5>Third slide label</h5>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
              </div>
            </div>
          </SwiperSlide>
        </div>
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper >
    </>
  );
}



export default Home