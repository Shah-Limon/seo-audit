import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// Import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Testimonials = () => {
  const [title, setTitle] = useState({});
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const generateRandomRating = () => {
    return (Math.random() * (5 - 4.5) + 4.5).toFixed(1);
  };

  const checkCacheValidity = (timestamp) => {
    const now = new Date().getTime();
    const threeHours = 3 * 60 * 60 * 1000;
    return now - timestamp < threeHours;
  };

  const fetchTestimonials = async () => {
    try {
      const cachedData = localStorage.getItem('testimonials-cache');
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (checkCacheValidity(timestamp)) {
          setTestimonials(data.map(item => ({
            ...item,
            rating: generateRandomRating()
          })));
          setIsLoading(false);
          return;
        }
      }

      const response = await fetch(`http://localhost:5000/testimonials/`);
      const data = await response.json();
      
      const testimonialsWithRatings = data.map(item => ({
        ...item,
        rating: generateRandomRating()
      }));
      
      localStorage.setItem('testimonials-cache', JSON.stringify({
        data: testimonialsWithRatings,
        timestamp: new Date().getTime()
      }));

      setTestimonials(testimonialsWithRatings);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setIsLoading(false);
    }
  };

  const fetchTitle = async () => {
    try {
      const cachedTitle = localStorage.getItem('testimonials-title-cache');
      if (cachedTitle) {
        const { data, timestamp } = JSON.parse(cachedTitle);
        if (checkCacheValidity(timestamp)) {
          setTitle(data);
          return;
        }
      }

      const response = await fetch(`http://localhost:5000/testimonials-title/`);
      const data = await response.json();
      
      localStorage.setItem('testimonials-title-cache', JSON.stringify({
        data: data[0],
        timestamp: new Date().getTime()
      }));

      setTitle(data[0]);
    } catch (error) {
      console.error('Error fetching title:', error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
    fetchTitle();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="testimonial-style-one-area default-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="site-heading text-center">
                <h4 className="sub-title">Customer Review</h4>
                <h2 className="title">What people say about us</h2>
                <div className="devider" />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {testimonials.length > 0 && (
                <Swiper
                  modules={[Autoplay, Pagination, Navigation]}
                  spaceBetween={30}
                  centeredSlides={false}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
               
                  breakpoints={{
                    640: {
                      slidesPerView: 1,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                    1024: {
                      slidesPerView: 3,
                    },
                  }}
                  className="testimonial-stage-carousel"
                >
                  {testimonials.map((testimonial) => (
                    <SwiperSlide key={testimonial._id}>
                      <div className="testimonial-style-one-item">
                        <div className="item">
                          <div className="provider">
                            <div className="thumb">
                              <img 
                                src={testimonial.personImg} 
                                alt={testimonial.personName}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "assets/img/800x800.png";
                                }}
                              />
                            </div>
                            <div className="info">
                              <h6>{testimonial.personName}</h6>
                              <span>{testimonial.personTitle}</span>
                            </div>
                          </div>
                          <div className="content">
                            <p>{testimonial.desc}</p>
                          </div>
                          <div className="review">
                            <i className="fas fa-star" />
                            {testimonial.rating}
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonials;