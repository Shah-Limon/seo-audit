import React, { useEffect, useState } from "react";

const FeaturesPage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const cachedData = localStorage.getItem('featureData');
    if (cachedData) {
      setServices(JSON.parse(cachedData));
    } else {
      fetch(`http://localhost:5000/features`)
        .then((res) => res.json())
        .then((info) => {
          setServices(info);
          localStorage.setItem('featureData', JSON.stringify(info));
        });
    }
  }, []);

  const [title, setTitle] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/features-title`)
      .then((res) => res.json())
      .then((info) => setTitle(info[0]));
  }, []);


  return (
    <>
      <div className="feature-style-one-area default-padding">
        <div className="shape">
          <img src="assets/img/shape/1.png" alt="Images shape one" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="site-heading text-center">
                <h4 className="sub-title"> {title.title}</h4>
                <h2 className="title"> {title.desc}</h2>
                <div className="devider" />
              </div>
            </div>
            <div className="col-lg-12 offset-lg-1">
              <div className="row">
                {services.map((service) => (
                  <div key={service._id} className="col-md-4 mb-30">
                    <div
                      className="feature-style-one-item animate "
                      data-animate="fadeInUp"
                    >
                      <img src={service.featureImg} alt={service.featureTitle} className="feature-icon mb-3 " width={60} />
                      <h4>{service.featureTitle}</h4>
                      <p>{service.featureDesc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturesPage;