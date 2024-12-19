import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const About = () => {
  const { id } = useParams();
  const [abouts, setAbouts] = useState([]);
  const swiperRef = useRef(null);

  useEffect(() => {
    // Fetch about services data
    fetch(`http://localhost:5000/about-services`)
      .then((res) => res.json())
      .then((info) => setAbouts(info));

    // Initialize Swiper
    if (swiperRef.current) {
      const swiper = new Swiper(swiperRef.current, {
        modules: [Navigation, Pagination],
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        loop: true, // Optional: adds infinite loop
      });

      // Cleanup Swiper instance on component unmount
      return () => {
        if (swiper) swiper.destroy();
      };
    }
  }, [id]);

  return (
    <>
      <div className="overview-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="site-heading text-center">
                <h4 className="sub-title">Why Choose</h4>
                <h2 className="title">Explore why this fits your needs.</h2>
                <div className="devider" />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="overview-items">
                <div 
                  ref={swiperRef} 
                  className="overview-carousel swiper"
                >
                  <div className="swiper-wrapper">
                  {abouts.map((about) => (
                    <div key={about._id} className="swiper-slide ">
                      <div className="overview-item">
                        <div className="overview-thumb">
                          <img
                            src={about.img}
                            alt={about.title}
                          />
                        </div>
                        <div className="overview-content">
                          <h2>{about.title}</h2>
                          <p>{about.description}</p>
                          <ul>
                            <li>{about.pointOne}</li>
                            <li>{about.pointTwo}</li>
                            <li>{about.pointThree}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}

                    {/* First Slide */}
                    

                  </div>

                  {/* Pagination */}
                  <div className="overview-pagination">
                    <div className="swiper-pagination" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;